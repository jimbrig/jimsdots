/// <reference path="slimcore.d.ts" />

declare module SlimCore {

    interface InstanceCounts {
        CanvasFrameSink?: number;
    }

    interface VideoBindingRendererArgs {
        enableBGRA?: boolean;
    }

    interface CanvasFrameSink extends FrameSink {
        getFrame(): FrameSink.VideoFrame;
    }

    interface ChromiumFrameSink extends FrameSink {
        _setForceI420(enabled: boolean): void;
        _setTextureSharingEnabled(enabled: boolean): void;
    }

    function _createCanvasFrameSink(): CanvasFrameSink;
}
