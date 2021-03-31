declare namespace SlimCore {

    namespace VideoRenderer {
        interface Logger {
            createChild(namespace: string): Logger;

            log(...args: any[]): void;
            debug(...args: any[]): void;
            info(...args: any[]): void;
            warn(...args: any[]): void;
            error(...args: any[]): void;
        }

        const enum ScalingMode {
            Stretch,
            Crop,
            Fit
        }

        interface ConstructorArgs {
            container: HTMLElement;
            transparent: boolean;
            scalingMode: ScalingMode;
            logger?: Logger;
            useBufferSharing?: boolean;
            useFirstFrameRender?: boolean;
        }

        const enum ErrorReason {
            Unknown,
            ContextFailed,
            Unavailable,
        }

        type Size = {
            width: number;
            height: number;
        }

        namespace Events {
            type VideoSizeChangedArgs = Size;
        }

        interface Events {
            "video-size-changed": Events.VideoSizeChangedArgs;
        }
    }

    interface VideoRendererError extends Error {
        readonly reason: VideoRenderer.ErrorReason;
    }

    interface VideoRenderer extends EventEmitter<VideoRenderer.Events>, Disposable {
        getFrameSink(): FrameSink;
        getVideoSize(): VideoRenderer.Size;
        setScalingMode(mode: VideoRenderer.ScalingMode): Promise<void>;
    }

    interface VideoRendererModule {
        createChromiumVideoRenderer(frameSink: ChromiumFrameSink, args: VideoRenderer.ConstructorArgs): VideoRenderer;
        isChromiumVideoRendererAvailable(): boolean;
    }
}

declare const VideoRenderer: SlimCore.VideoRendererModule;
