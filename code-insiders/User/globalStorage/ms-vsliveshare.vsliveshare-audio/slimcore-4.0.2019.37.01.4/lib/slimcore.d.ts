/// <reference path="slimcore_autogen.d.ts" />
/// <reference path="slimcore-enums.d.ts" />
/// <reference path="slimcore-enums_autogen.d.ts" />

declare module SlimCore {

    interface Disposable {
        dispose(): void;
        isDisposed?(): boolean;
    }

    type EventHandler<T> = (args: T) => void;

    interface EventEmitter<T> {
        handle?<P extends keyof T>(event: P, filter: Partial<T[P]>, listener: EventHandler<T[P]>): Disposable;
        addListener<P extends keyof T>(event: P, listener: EventHandler<T[P]>): this;
        on<P extends keyof T>(event: P, listener: EventHandler<T[P]>): this;
        once<P extends keyof T>(event: P, listener: EventHandler<T[P]>): this;
        removeListener<P extends keyof T>(event: P, listener: EventHandler<T[P]>): this;
        removeAllListeners<P extends keyof T>(event?: P): this;
        getMaxListeners(): number;
        setMaxListeners(n: number): void;
        listeners<P extends keyof T>(event: P): Function[];
        emit<P extends keyof T>(event: P, args: T[P]): boolean;
    }

    interface SlimCoreOptions {
        version: string;
        dataPath: string;
        logFileName?: string;
        mediaLogsPath?: string;
        isEncrypted?: boolean;
        objectLogging?: boolean;
        stdoutLogging?: boolean;
    }

    interface InstanceCounts {
        ChromiumFrameSink?: number;
        VideoBindingRenderer?: number;
        VideoBindingScreenShare?: number;
        DataChannel?: number;
        DataSink?: number;
        DataSource?: number;
        Ndi?: number;
        Trouter?: number;
        TrouterListener?: number;
        TrouterRequest?: number;
        TrouterResponse?: number;
    }

    function getVersion(): string;
    function getApiVersion(): number;

    function createSlimCoreInstance(options: SlimCoreOptions): Engine;
    function createChromiumFrameSink(): ChromiumFrameSink;
    function getInstanceCounts(): InstanceCounts;
    function queryDeviceRotation(): number;
    function getAuthorizationStatus(mediaType: Enums.MediaType): Enums.AuthorizationStatus;
    function requestAuthorization(mediaType: Enums.MediaType): Promise<boolean>;

    interface DeviceInfo {
        id: string;
        label: string;
        vendorId: number | string;
        productId: number | string;
    }

    interface AudioDeviceInfo extends DeviceInfo {
        isSystemDefault: boolean;
    }

    interface VideoDeviceInfo extends DeviceInfo {
        deviceType: Enums.DeviceType;
        cameraFacing: Enums.CameraFacing;
        compositeId: number;
    }

    interface CompositeAudioDeviceInfo {
        label: string;
        microphoneId: string;
        microphoneProductId: string;
        speakerId: string;
        speakerProductId: string;
        deviceType: Enums.CompositeAudioDeviceType;
        isPcInternalDevice: boolean;
    }

    interface SnapshotOptions {
        width?: number;
        height?: number;
        asImage?: boolean;
        allowRetinaSizedImages?: boolean;
    }

    interface Region {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface MonitorInfo {
        monitorId: number;
        name: string;
        region: Region;
        isPrimary: boolean;
        isInternal: boolean;
        isDuplicated: boolean;
    }

    interface WindowInfo {
        windowId: number;
        title: string;
        applicationName?: string;
    }

    interface ImageData {
        data: Uint8Array | string;
        width: number;
        height: number;
        isImage: boolean;
    }

    interface VideoBindingRendererArgs {
        enableDXVA?: boolean;
        ignoreBlankFrame?: boolean;
        isLocalPreview?: boolean;
    }

    interface HandlePushNotificationOptions {
        eventType: number;
        servicePayload: string;
        correlationIdsJson?: string;
        notificationSource?: string;
        isBuddy?: boolean;
        callKey?: string;
        connectionType?: Enums.ConnectionType;
        accountIdentity?: string;
        mediaConfigurationJson?: string;
    }

    interface InsertRegistrationTransportOptions {
        serviceTypes: Enums.ServiceType[];
        contexts: string[];
        registrationTokens: string[];
        registrationTTLs: number[];
        activityId: string;
        reason: string;
    }

    interface Credentials {
        accountName: string;
        passwordHash: string;
        refreshToken: string;
        refreshTokenExpiration: number;
        skypeToken: string;
        skypeTokenExpiration: number;
        partnerId: number;
    }

    interface MediaConfiguration {
        openCameraInMaxResolution?: boolean;
        mediaPortRanges?: MediaPortRanges;
        enableMediaQoS?: boolean;
        enableAGC?: boolean;
        enableTtySupport?: boolean;
        setOutputSliderVolume?: number;
        enableSystemSoundSharing?: boolean;
        audioUsageMode?: Enums.AudioUsageMode;
        maxBandwidthInBps?: number;
    }

    interface Size {
        width: number;
        height: number;
    }
    
    interface VideoCaptureConfig {
        minFrameSize?: Size;
        maxFrameSize?: Size;
        minFrameRate?: number;
        maxFrameRate?: number;
        orientationOffset?: number;
    }

    interface Setup extends Disposable {
        isDefined(key: string): boolean;
        delete(key: string): void;
        getStr(key: string, defaultValue?: string): string;
        getInt(key: string, defaultValue?: number): number;
        setStr(key: string, value: string): void;
        setInt(key: string, value: number): void;
    }

    namespace Engine {
        namespace Events {
            type ObjectPropertyChangedArgs = {
                objectType: Enums.ObjectType;
                objectId: ObjectId;
                propKey: Enums.Property;
                value: string | number;
            };

            type QualityChangedArgs = {
                objectType: Enums.ObjectType;
                objectId: ObjectId;
                type: Enums.QualityEventType;
                value: Enums.QualityLevel;
                mediaType: Enums.MediaType;
            };

            type DeviceListChangedArgs = {
                video: boolean;
            };

            type E911InfoArgs = {
                info: string;
            };

            type LibStatusChangedArgs = {
                libStatus: Enums.LibStatus;
            }

            type MediaStatusChangedArgs = {
                mediaStatus: Enums.MediaStatus;
            }

            type NdiTelemetryEventArgs = {
                name: string;
                payload: string;
            };
        }

        interface Events {
            "object-property-changed": Events.ObjectPropertyChangedArgs;
            "quality-changed": Events.QualityChangedArgs;
            "device-list-changed": Events.DeviceListChangedArgs;
            "e911-info-changed": Events.E911InfoArgs;
            "lib-status-changed": Events.LibStatusChangedArgs;
            "media-status-changed": Events.MediaStatusChangedArgs;
            "ndi-telemetry-event": Events.NdiTelemetryEventArgs;
        }
    }

    interface Engine extends Disposable, EventEmitter<Engine.Events> {
        start(block?: boolean): void;

        login(userId: string, skypeToken: string, displayName?: string): void; // DEPRECATED
        logout(): void; // DEPRECATED
        updateSkypeToken(skypeToken: string): void; // DEPRECATED

        // Ideally to be set as soon as you login.
        // Can be of the format - <rc_id1>:<userId1>;aliases=<rc_id2>:<userId2>,<rc_id3>:<userId3>
        // Example: 8:identity;aliases=2:sipId@microsoft.com,4:+100000001
        setAdditionalIdentities(identities: string): void; // DEPRECATED

        setRing(ring: string): void; // DEPRECATED
        setTenantId(tenantId: string): void; // DEPRECATED

        fireIntent(intent: Enums.Intent, identity?: string, preheatCall?: CallProperties, accountIdentity?: string): void;
        flushLogs(): void;

        getNodeId(): string;
        getFingerprintId(): string;

        setupIsDefined(key: string): boolean; // DEPRECATED
        setupDelete(key: string): void; // DEPRECATED
        setupGetSubKey(key: string, index: number): string; // DEPRECATED
        setupGetStr(key: string, defaultValue?: string): string; // DEPRECATED
        setupGetInt(key: string, defaultValue?: number): number; // DEPRECATED
        setupSetStr(key: string, value: string): void; // DEPRECATED
        setupSetInt(key: string, value: number): void; // DEPRECATED

        getEcsQueryParameters(): string;
        getSetup(accountIdentity?: string): Setup;

        // agent corresponds to the ECS project name and path corresponds to the short path in the JSON.
        // Ex: The API parameters to read a config in SkypeCalling project with the JSON { "ngIcoming": { "isUdpEnabled": true } }
        // ecsGetSettingAsBool("SkypeCalling", "ngIncoming/isUdpEnabled, false);
        ecsGetSettingAsInt(agent: string, path: string, defaultValue?: number): number;
        ecsGetSettingAsString(agent: string, path: string, defaultValue?: string): string;
        ecsGetSettingAsBool(agent: string, path: string, defaultValue?: boolean): boolean;

        setMediaConfig(configuration: MediaConfiguration): void;
        setDeviceRotation(rotation: number): void;

        getCameraList(): VideoDeviceInfo[];
        getMicrophoneList(): AudioDeviceInfo[];
        getSpeakerList(): AudioDeviceInfo[];
        getCompositeAudioDevices(): CompositeAudioDeviceInfo[];

        getMonitorList(): MonitorInfo[];
        getMonitorSnapshot(monitorId: number, options: SnapshotOptions, region?: Region): Promise<ImageData>;

        getWindowList(): WindowInfo[];
        getWindowIcon(windowId: number, options: SnapshotOptions): Promise<ImageData>;
        getWindowSnapshot(windowId: number, options: SnapshotOptions): Promise<ImageData>;

        selectAudioDevices(microphone: string, speaker: string): void;

        getMicrophoneVolume(): number;
        setMicrophoneVolume(volume: number): void;

        videoStart(videoObjectId: ObjectId, negotiationTag?: string): void;
        videoStop(videoObjectId: ObjectId, negotiationTag?: string): void;

        createDataSource(dataId: number): DataSource;
        createDataSink(dataId: number): DataSink;

        createVideoBindingRenderer(args: VideoBindingRendererArgs): VideoBindingRenderer;
        createVideoBindingScreenShare(): VideoBindingScreenShare;
        videoCreateBinding(videoObjectId: ObjectId, videoBinding: VideoBinding): Promise<void>;
        videoReleaseBinding(videoObjectId: ObjectId, videoBinding: VideoBinding): Promise<void>;

        createLocalVideo(type: Enums.VideoType, name?: string, path?: string, label?: string): ObjectId;
        createPreviewVideo(type: Enums.VideoType, name?: string, path?: string): ObjectId;

        createNdi(localizedStrings?: string): Ndi;
        createCallInterface(): CallHandler;

        getAccount(accountIdentity: string): Account;
        getCallHandler(accountObjectId: ObjectId): CallHandler;
        getContentSharing(contentSharingObjectId: ObjectId): ContentSharing;
        getDataChannel(dataChannelObjectId: ObjectId): DataChannel;

        createTrouter(handle?: string): Trouter;
        createTrouterListener(): TrouterListener;

        handlePushNotification(options: HandlePushNotificationOptions): number;
        insertRegistrationTransports(options: InsertRegistrationTransportOptions): number;

        getOldCredentials(): Credentials;

        setDeviceEffects(deviceId: DeviceId, type: Enums.VideoEffectType): void;
        getDeviceEffectsCapability(deviceId: DeviceId, mask?: number): number;
        setBackgroundImage(deviceId: DeviceId, imagePath: string): void;
        setVideoCaptureConfig(deviceId: DeviceId, config: VideoCaptureConfig): void;
        dumpVideoSourceImages(videoObjectId: ObjectId): Promise<number>;

        getProperties?<T extends StrProperties, U extends IntProperties>(objectId: ObjectId, strProperties: T, intProperties: U): PropertyResults<T, U>;

        getMediaStatus(): Enums.MediaStatus;
    }

    interface VideoBinding extends Disposable {
        isAttached(): boolean;
    }

    namespace VideoBindingRenderer {
        type CaptureFrameOptions = {
            timeout?: number; // milliseconds
        };

        type Frame = {
            image: ImageData;
            origWidth: number;
            origHeight: number;
            mirror: boolean;
            cropInfo: FrameSink.CropInfo;
        } & FrameSink.Metadata;
    }

    interface VideoBindingRenderer extends VideoBinding {
        hasFrameSink(frameSink: FrameSink): boolean;
        addFrameSink(frameSink: FrameSink): void;
        removeFrameSink(frameSink: FrameSink): void;
        setVideoPreference(width: number, height: number): void;
        captureFrame(options?: VideoBindingRenderer.CaptureFrameOptions): Promise<VideoBindingRenderer.Frame>;
    }

    namespace VideoBindingScreenShare {
        namespace Events {
            type ScraperEventArgs = {
                event: Enums.ScraperEvent;
                data: number;
            };
        }

        interface Events {
            "scraper-event": Events.ScraperEventArgs;
        }
    }

    interface VideoBindingScreenShare extends EventEmitter<VideoBindingScreenShare.Events>, VideoBinding {
        setCaptureRegionAndWindow(region?: Region, windowId?: number): void;
    }

    namespace FrameSink {
        type Format = string;

        type CropInfo = {
            leftOffset: number;
            rightOffset: number;
            topOffset: number;
            bottomOffset: number;
        }

        type ImageInfo = {
            format: Format;
            width: number;
            height: number;
            origWidth: number;
            origHeight: number;
            stride: number;
            timestamp: Date;
            timestampValue: number;
            mirror: boolean;
            padding: CropInfo;
            cropInfo: CropInfo;
        }

        type VideoFrame = {
            info: ImageInfo;
            data: ArrayBuffer;
        }

        type Metadata = {
            attachment: Uint8Array;
            timestamp: Date;
            timestampValue: number;
        }

        const enum FrameType {
            None,
            Software,
            Hardware,
        }

        const enum LogLevel {
            Default,
            Debug,
            Info,
            Warning,
            Error,
        }

        type Stats = {
            framesDropped: number;
            framesTotal: number;
        }

        namespace Events {
            type FirstFrameRenderedArgs = {
            };

            type FrameTypeChangedArgs = {
                type: FrameType;
            };

            type FrameSizeChangedArgs = {
                width: number;
                height: number;
            };
			
            type FullFrameRenderRequiredArgs = {
                fullFrameRenderRequired: boolean;
            };
        }

        interface Events {
            "first-frame-rendered": Events.FirstFrameRenderedArgs;
            "frame-type-changed": Events.FrameTypeChangedArgs;
            "frame-size-changed": Events.FrameSizeChangedArgs;
            "full-frame-render-required": Events.FullFrameRenderRequiredArgs;
        }
    }

    interface FrameSink extends EventEmitter<FrameSink.Events>, Disposable {
        getStats(): FrameSink.Stats;
        getMetadata(): FrameSink.Metadata;
        getFrameType(): FrameSink.FrameType;
        setVideoPreference(width: number, height: number): void;
        setIgnoreMirroring(ignore: boolean): void;
        log(level: FrameSink.LogLevel, message: string): void;
    }

    namespace ChromiumFrameSink {
        type Stats = FrameSink.Stats & {
            rendererFramesDropped: number;
            rendererFramesTotal: number;
            rendererFramesInBackground: number;
        };

        const enum StorageType {
            None,
            Buffer,
            Texture,
        }

        namespace Events {
            type StorageTypeChangedArgs = {
                type: StorageType;
            };
        }

        interface Events extends FrameSink.Events {
            "storage-type-changed": Events.StorageTypeChangedArgs;
        }
    }

    interface ChromiumFrameSink extends EventEmitter<ChromiumFrameSink.Events>, FrameSink {
        getBufferName(): string;
        getStats(): ChromiumFrameSink.Stats;
    }

    interface CallVoicemailProperties {
        threadId?: string;
        voicemailResourcePath?: string;
        voicemailItemId?: string;
    }

    interface StrProperties {
        [key: string]: {
            objectId?: ObjectId;
            propKey: SlimCore.Enums.Property;
            fallback?: string;
        };
    }

    interface IntProperties {
        [key: string]: {
            objectId?: ObjectId;
            propKey: SlimCore.Enums.Property;
            fallback?: number;
        };
    }

    type StrPropertyResults<T> = {
        [P in keyof T]: string;
    };

    type IntPropertyResults<T> = {
        [P in keyof T]: number;
    };

    type PropertyResults<T, U> = StrPropertyResults<T> & IntPropertyResults<U>;

    type ObjectId = number;
    type DeviceId = string;

    // This interface contains CallHandler APIs that are not autogenerated
    // avoid manually inserting any in here at all costs.
    interface CallHandler extends Disposable, EventEmitter<CallHandler.Events> {
        placeCall(callGuid: string, participantList: string[], callProperties?: CallProperties): ObjectId;
        startSignalingSession(callGuid: string, participantList: string[], callProperties?: CallProperties): ObjectId;

        joinCall(joinContext: string, callProperties: CallProperties): ObjectId;
        joinSignalingSession(joinContext: string, callProperties: CallProperties): ObjectId;

        subscribe(joinContext: string, callProperties: CallProperties): ObjectId;
        subscribeToSignalingSession(joinContext: string, callProperties: CallProperties): ObjectId;

        answerCall(callObjectId: ObjectId, isVideoEnabled?: boolean): void;
        acceptCall(callObjectId: ObjectId, answerMediaType: Enums.AnswerMediaType): void;

        addParticipant(callObjectId: ObjectId, participant: string, threadId?: string, messageId?: string, additionalData?: string): ObjectId;
        nudgeParticipants(callObjectId: ObjectId, participantList: string[], context?: string, threadId?: string, messageId?: string, additionalData?: string): void;

        callUpdateEndpointMetadata(callObjectId: ObjectId, endpointMetadata: string): void;

        getIntProperty(objectId: ObjectId, propertyKey: Enums.Property): number; // DEPRECATED
        getStrProperty(objectId: ObjectId, propertyKey: Enums.Property): string; // DEPRECATED

        getProperties?<T extends StrProperties, U extends IntProperties>(objectId: SlimCore.ObjectId, strProperties: T, intProperties: U): PropertyResults<T, U>; // DEPRECATED

        placeCallToVoicemail(callGuid: string, mediaPeerType: Enums.MediaPeerType, participant: string, callProperties?: CallVoicemailProperties): ObjectId;
    }

    interface MediaPortRanges {
        audioMin: number;
        audioMax: number;
        videoMin: number;
        videoMax: number;
        dataMin: number;
        dataMax: number;
        vbssMin?: number;
        vbssMax?: number;
    }

    interface DataChannel extends Disposable {
        start(negotiationTag?: string): void;
        stop(negotiationTag?: string): void;

        registerDataSource(dataSource: DataSource): void;
        unregisterDataSource(dataSource: DataSource): void;

        registerDataSink(dataSink: DataSink): void;
        unregisterDataSink(dataSink: DataSink): void;

        setDataDevices(): void;

        sendUserEvents(events: string, participantIds?: string[]): void;
    }

    namespace DataDevice {
        namespace Events {
            type EventArgs = {
                event: Enums.DataDeviceEvent;
            };
        }

        interface Events {
            "event": Events.EventArgs;
        }
    }

    interface DataDevice extends Disposable, EventEmitter<DataDevice.Events> {
    }

    interface DataSource extends DataDevice {
        sendData(data: Uint8Array, recipients?: number[]): void;
    }

    namespace DataSink {
        namespace Events {
            type DataArgs = {
                data: Uint8Array;
                sourceID: number;
            };
        }

        interface Events {
            "data": Events.DataArgs;
        }
    }

    interface DataSink extends EventEmitter<DataSink.Events>, DataDevice {
    }

    namespace Trouter {
        interface HeaderEntry {
            header: string;
            value: string;
        }
    }

    interface TrouterRequest extends Disposable {
        getHeaders(): Trouter.HeaderEntry[];
        getBody(): string;
        getMethod(): string;
        getURLPathComponent(): string;
    }

    interface TrouterResponse extends Disposable {
        getId(): number;
        getHeaders() : Trouter.HeaderEntry[];
        getBody() : string;
        getStatus() : number;

        setHeader(header: string, value: string): void;
        setBody(body: string): void;
        setStatus(status: number): void;

        send(): Enums.TrouterMessageSendStatusCode;
    }

    namespace TrouterListener {
        namespace Events {
            type TrouterConnectedArgs = {
                endpointUrl: string;
                connectionInfo: TrouterConnectionInfo2;
                routingPath: string;
                newPublicUrl: boolean;
                missedRequests: boolean;
            };

            type TrouterDisconnectedArgs = { };

            type TrouterRequestArgs = {
                request: TrouterRequest;
                response: TrouterResponse;
            };

            type TrouterResponsSentArgs = {
                response: TrouterResponse;
                isSuccess: boolean;
            };
        }
        interface Events {
            "trouter-connected": Events.TrouterConnectedArgs;
            "trouter-disconnected": Events.TrouterDisconnectedArgs;
            "trouter-request": Events.TrouterRequestArgs;
            "trouter-response-sent": Events.TrouterResponsSentArgs;
        }
    }

    interface TrouterListener extends Disposable, EventEmitter<TrouterListener.Events> {
    }

    interface Trouter extends Disposable {
        createTrouterListener(): TrouterListener;
        registerListener(listener: TrouterListener, path: string, loggingName: string): void;
        unregisterListener(listener: TrouterListener): void;
        registerListener2(listener: TrouterListener2, path: string): void;
        unregisterListener2(remoteId: string): void;

        getConnectionTTLInSec(): number;
        getConnectionId(): string;
        getConnectedClientId(): string;
    }

    // TsTrouter-like interfaces with a few changes for better IPC layout

    interface TrouterConnectionInfo2 {
        readonly baseEndpointUrl: string;
        readonly newEndpointUrl: boolean;
        readonly c2cUrlBase: string;
        readonly clientId: string;
        readonly connectionId: string;
        readonly connectionTtlSec: number;
    }

    type TrouterHeaders2 = {
        [name: string]: string;
    };

    interface TrouterRequest2 {
        readonly id: number;
        readonly method: string;
        readonly path: string;
        readonly headers: TrouterHeaders2;
        readonly body: string;
    }

    interface TrouterResponse2 {
        readonly id: number;
        status: number;
        headers: TrouterHeaders2;
        body: string;
    }

    interface TrouterListener2 {
        onTrouterConnected(endpointUrl: string, connectionInfo: TrouterConnectionInfo2): void;
        onTrouterDisconnected?(): void;
        onTrouterRequest(request: TrouterRequest2, responseSendFunc: (response: TrouterResponse2) => number): void;
        remoteId: string;
    }

    namespace Ndi {
        namespace Events {
            type IsCapturedChangedArgs = {
            };
        }

        interface Events {
            "is-captured-changed": Events.IsCapturedChangedArgs;
        }
    }

    interface Ndi extends Disposable, EventEmitter<Ndi.Events> {
        cleanUpAsync(): Promise<void>;
        isSupported(): boolean;
        isCaptured(): boolean;
        updateLocalizedStrings(localizedStrings: string): void;
        updateSettings(settings: string): void;
    }
}

declare module 'slimcore' {
    export = SlimCore;
}
