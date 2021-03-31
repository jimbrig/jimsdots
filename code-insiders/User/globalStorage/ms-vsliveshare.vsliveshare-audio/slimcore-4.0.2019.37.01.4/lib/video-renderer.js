/// <reference path="./slimcore.d.ts" />
/// <reference path="./video-renderer.d.ts" />
'use strict';
const events_1 = require("events");
const API_VERSION = 2;
const SET_VIDEO_PREFERENCE_DEBOUNCE_TIMEOUT = 1000;
// -----------------------------------------------------------------------------
class NoopLogger {
    createChild() { return this; }
    log() { }
    debug() { }
    info() { }
    warn() { }
    error() { }
}
class LoggerProxy {
    constructor(_context, _logger, _frameSink) {
        this._context = _context;
        this._logger = _logger;
        this._frameSink = _frameSink;
    }
    log(message) {
        this._logger.log(message);
        this._log(0 /* Default */, message);
    }
    debug(message) {
        this._logger.debug(message);
        this._log(1 /* Debug */, message);
    }
    info(message) {
        this._logger.info(message);
        this._log(2 /* Info */, message);
    }
    warn(message) {
        this._logger.warn(message);
        this._log(3 /* Warning */, message);
    }
    error(message) {
        this._logger.error(message);
        this._log(4 /* Error */, message);
    }
    _log(level, message) {
        try {
            if (this._frameSink.log) {
                this._frameSink.log(level, `${this._context}: ${message}`);
            }
        }
        catch (error) {
        }
    }
}
// -----------------------------------------------------------------------------
let uniqueId = 0;
function getUniqueId() {
    return ++uniqueId;
}
// -----------------------------------------------------------------------------
class ChromiumVideoRenderer extends events_1.EventEmitter {
    constructor(args, _frameSink) {
        super();
        this._frameSink = _frameSink;
        this._videoElement = null;
        this._videoWidth = 0;
        this._videoHeight = 0;
        this._rendererWidth = 0;
        this._rendererHeight = 0;
        this._pendingTimeout = null;
        this._cleanupHandlers = [];
        this._isDisposed = false;
        if (typeof HTMLSkypeVideoElement !== 'function') {
            const message = 'HTMLSkypeVideoElement is not available';
            throw new VideoRendererError(message, 2 /* Unavailable */);
        }
        if (HTMLSkypeVideoElement.API_VERSION !== API_VERSION) {
            const message = `HTMLSkypeVideoElement - actual version: ${HTMLSkypeVideoElement.API_VERSION}, expected version: ${API_VERSION}`;
            throw new VideoRendererError(message, 2 /* Unavailable */);
        }
        const context = `${this.constructor.name} #${getUniqueId()}`;
        const childLogger = (args.logger || new NoopLogger()).createChild(context);
        this._logger = new LoggerProxy(context, childLogger, _frameSink);
        this._logger.debug(`constructor - args: ${JSON.stringify({
            transparent: args.transparent,
            scalingMode: getScalingMode(args.scalingMode),
            useBufferSharing: args.useBufferSharing,
            useFirstFrameRender: args.useFirstFrameRender,
        })}`);
        this._initialize(args);
    }
    dispose() {
        if (this._logger) {
            this._logger.debug(`dispose`);
        }
        if (this._frameSink) {
            this._frameSink.dispose();
        }
        if (this._cleanupHandlers) {
            this._cleanupHandlers.forEach((handler) => handler());
        }
        if (this._videoElement) {
            this._videoElement.remove();
            const videoElement = this._videoElement;
            setTimeout(() => { videoElement.src = ''; }, 0);
        }
        if (this._pendingTimeout) {
            clearTimeout(this._pendingTimeout);
        }
        delete this._logger;
        delete this._frameSink;
        delete this._videoElement;
        delete this._videoWidth;
        delete this._videoHeight;
        delete this._rendererWidth;
        delete this._rendererHeight;
        delete this._pendingTimeout;
        delete this._cleanupHandlers;
        this._isDisposed = true;
    }
    isDisposed() {
        return this._isDisposed;
    }
    getFrameSink() {
        return this._frameSink;
    }
    getVideoSize() {
        return {
            width: this._videoWidth,
            height: this._videoHeight,
        };
    }
    setScalingMode(mode) {
        this._logger.debug(`setScalingMode: ${mode}`);
        this._videoElement.scalingMode = getScalingMode(mode);
        return Promise.resolve();
    }
    _initialize(args) {
        this._videoElement = this._createVideoElement(args);
        this._addElementToContainer(this._videoElement, args.container);
        this._handleEvent('error', (event) => this._logError(event));
        this._handleEvent('resize', () => this._checkVideoSize());
        this._handleEvent('msLogEvent', (event) => this._logEvent(event));
        this._handleEvent('msRendererSizeChanged', () => this._checkRendererSize());
        this._handleEvent('msBackgroundRenderingChanged', () => this._checkBackgroundRendering());
        const bufferName = this._frameSink.getBufferName();
        this._logger.debug(`loadSync: ${bufferName}`);
        this._videoElement.loadSync(bufferName);
    }
    _createVideoElement(args) {
        const document = args.container.ownerDocument;
        const video = document.createElement('skypevideo');
        video.style.backgroundColor = args.transparent ? '' : 'black';
        video.scalingMode = getScalingMode(args.scalingMode);
        video.bufferSharingEnabled = !!args.useBufferSharing;
        video.firstFrameRenderEnabled = !!args.useFirstFrameRender;
        return video;
    }
    _addElementToContainer(element, container) {
        element.style.width = '100%';
        element.style.height = '100%';
        if (container.hasChildNodes()) {
            this._logger.warn('Appending to a non-empty container');
        }
        container.appendChild(element);
    }
    _handleEvent(type, listener) {
        // tslint:disable-next-line:no-any
        return this._addEventListener(this._videoElement, type, listener);
    }
    _addEventListener(element, type, listener) {
        element.addEventListener(type, listener);
        this._cleanupHandlers.push(() => element.removeEventListener(type, listener));
    }
    _logError(event) {
        if (event instanceof ErrorEvent) {
            this._logger.error(`error: ${event.message}`);
        }
        else {
            this._logger.error(`error: ${formatMediaError(this._videoElement.error)}`);
        }
    }
    _logEvent(event) {
        switch (event.level) {
            case 0 /* Default */:
                this._logger.log(event.message);
                break;
            case 1 /* Debug */:
                this._logger.debug(event.message);
                break;
            case 2 /* Info */:
                this._logger.info(event.message);
                break;
            case 3 /* Warning */:
                this._logger.warn(event.message);
                break;
            case 4 /* Error */:
                this._logger.error(event.message);
                break;
            default:
        }
    }
    _checkVideoSize() {
        const videoWidth = this._videoElement.videoWidth;
        const videoHeight = this._videoElement.videoHeight;
        if (this._videoWidth !== videoWidth || this._videoHeight !== videoHeight) {
            this._videoWidth = videoWidth;
            this._videoHeight = videoHeight;
            this._logger.debug(`video-size-changed: ${videoWidth} x ${videoHeight}`);
            this.emit('video-size-changed', this.getVideoSize());
        }
    }
    _checkRendererSize() {
        let pixelWidth = this._videoElement.clientWidth * devicePixelRatio;
        let pixelHeight = this._videoElement.clientHeight * devicePixelRatio;
        const ratio = this._videoElement.rendererWidth / this._videoElement.rendererHeight;
        if (this._videoElement.scalingMode === 'fit') {
            if (ratio > (pixelWidth / pixelHeight)) {
                pixelHeight = pixelWidth / ratio;
            }
            else {
                pixelWidth = pixelHeight * ratio;
            }
        }
        else if (this._videoElement.scalingMode === 'crop') {
            if (ratio < (pixelWidth / pixelHeight)) {
                pixelHeight = pixelWidth / ratio;
            }
            else {
                pixelWidth = pixelHeight * ratio;
            }
        }
        const rendererWidth = Math.floor(pixelWidth) || 0;
        const rendererHeight = Math.floor(pixelHeight) || 0;
        if (this._rendererWidth !== rendererWidth || this._rendererHeight !== rendererHeight) {
            this._rendererWidth = rendererWidth;
            this._rendererHeight = rendererHeight;
            this._setVideoPreference(rendererWidth, rendererHeight);
        }
    }
    _setVideoPreference(width, height) {
        if (this._pendingTimeout) {
            clearTimeout(this._pendingTimeout);
        }
        const handler = () => {
            this._pendingTimeout = null;
            this._logger.debug(`setVideoPreference: ${width} x ${height} @dpi ${devicePixelRatio}`);
            this._frameSink.setVideoPreference(width, height);
        };
        this._pendingTimeout = setTimeout(handler, SET_VIDEO_PREFERENCE_DEBOUNCE_TIMEOUT);
    }
    _checkBackgroundRendering() {
        this._logger.debug(`backgroundRendering: ${this._videoElement.backgroundRendering}`);
    }
}
exports.ChromiumVideoRenderer = ChromiumVideoRenderer;
// -----------------------------------------------------------------------------
function getScalingMode(mode) {
    switch (mode) {
        case 0 /* Stretch */:
            return 'stretch';
        case 1 /* Crop */:
            return 'crop';
        case 2 /* Fit */:
            return 'fit';
        default:
            return undefined;
    }
}
function formatMediaError(error) {
    switch (error && error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
            return 'MEDIA_ERR_ABORTED';
        case MediaError.MEDIA_ERR_NETWORK:
            return 'MEDIA_ERR_NETWORK';
        case MediaError.MEDIA_ERR_DECODE:
            return 'MEDIA_ERR_DECODE';
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
        default:
            return undefined;
    }
}
// -----------------------------------------------------------------------------
class VideoRendererError extends Error {
    constructor(message, reason = 0 /* Unknown */) {
        super(message);
        this.reason = reason;
    }
}
// -----------------------------------------------------------------------------
function createChromiumVideoRenderer(frameSink, args) {
    return new ChromiumVideoRenderer(args, frameSink);
}
exports.createChromiumVideoRenderer = createChromiumVideoRenderer;
function isChromiumVideoRendererAvailable() {
    return typeof HTMLSkypeVideoElement === 'function' && HTMLSkypeVideoElement.API_VERSION === API_VERSION;
}
exports.isChromiumVideoRendererAvailable = isChromiumVideoRendererAvailable;
