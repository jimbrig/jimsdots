declare namespace SlimCore {
    namespace Enums {

        enum DataDeviceEvent {
            Started,
            Stopped,
            BufferAvailable,
            PacketLoss,
        }

        enum DataDeviceId {
            Protocol,
            Control,
            Transcript,
        }

        enum QualityLevel {
            Unknown,
            Good,
            Poor,
            Bad,
        }

        enum QualityEventType {
            NetworkSendQuality,
            NetworkRecvQuality,
            NetworkDelay,
            NetworkBandwidthLow,
            NetworkPacketLoss,
            NetworkJitter,
            NetworkRateMatching,
            DeviceCaptureNotFunctioning,
            DeviceRenderNotFunctioning,
            DeviceRenderGlitches,
            DeviceLowSNR,
            DeviceLowSpeechLevel,
            DeviceClipping,
            DeviceEcho,
            PresentationAudioQuality,
            DeviceHalfDuplexAec,
            DeviceMultipleEndpoints,
            DeviceHowling,
            DeviceRenderZeroVolume,
            DeviceRenderMute,
            NetworkSendCatastrophic,
            NetworkRecvCatastrophic,
            CpuInsufficient,
            DeviceCaptureMute,
            DeviceCaptureNotMuteButSilent,
            DeviceSpeakWhileMuted,
            VideoVbssRendered,
            NetworkRoaming,
            NetworkEthernetInterfaceUsed,
            NetworkWlanInterfaceUsed,
            NetworkWwanInterfaceUsed,
            RelayWhiteListing,
            NetworkReconnect,
            VideoCapturerDeviceStartFailed,
            VideoCapturerDeviceStartTimedOut,
            VideoCapturerDeviceStartFailureLackSystemRes,
            VideoCapturerDeviceStartFailureMFResConflict,
            ZeroCaptureDevicesEnumerated,
            ZeroRenderDevicesEnumerated,
            NoNetwork,
            NetworkNotWorking,
            DeviceCaptureNotFunctioningAudioSrvNotRunning,
            DeviceRenderNotFunctioningAudioSrvNotRunning,
            DeviceCaptureNotFunctioningDeviceInUse,
            DeviceRenderNotFunctioningDeviceInUse,
            VideoCaptureDeviceFreeze,
            AudioCapturePermissionDenied,
            VideoCapturePermissionDenied,
            VideoCaptureFreezeRecovered,
            DeviceRenderHowling,
            LowFarEndInput,
            RemoteNetworkConnectivityIssue,
            PresentationAudioLoopbackDeviceState
        }

        enum TrouterMessageSendStatusCode {
            ResponseSent,
            ResponseTimeout,
            ResponseDuplicate,
            ResponseIncomplete,
            TrouterDisconnected,
        }

        enum ScraperEvent {
            Ok,
            Started,
            Stopped,
            Error,
            WindowMinimized,
            WindowRestored,
            WindowFullyOccluded,
            WindowExposed,
            WindowClosed,
            PPTPresenterView_Enter,
            PPTPresenterView_Exit,
            WindowInPriviledgedProcess,
            OcclusionRemovalDisabled,
            FrameCount,
            Resolution,
        }

        enum VideoEffectType {
            Off                                 = 0,
            BackgroundBlurDefault               = 1 << 0,
            BackgroundBlurLight                 = 1 << 1,
            BackgroundBlurExperimental_1        = 1 << 2,
            BackgroundBlurExperimental_2        = 1 << 3,
            BackgroundReplacement               = 1 << 4,    
            WhiteboardZoom                      = 1 << 5,
            WhiteboardCleanup                   = 1 << 6,
            WhiteboardZoomAndCleanup            = WhiteboardZoom | WhiteboardCleanup,
        }

        enum LibStatus {
            Constructed,
            Starting,
            Running,
            Stopping,
            Stopped,
            FatalError,
        }

        enum Feature {
            AsyncStart,
            RemoteVideosCountChanged,
            StructuredMeetings,
            MultiUserSupport,
            ObservingStateSupported,
            LazyMediaInit,
            AttendeeBlackList
        }

        enum AuthorizationStatus {
            NotDetermined,
            Restricted,
            Denied,
            Authorized,
        }

        enum MediaStatus {
            NotAvailable,
            Initialized,
            Failed,
            Uninitialized,
        }
    }
}
