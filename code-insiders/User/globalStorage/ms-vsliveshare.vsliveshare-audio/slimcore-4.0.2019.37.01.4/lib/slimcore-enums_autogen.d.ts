/*   ============================================================================
 *                         GENERATED FILE - DO NOT MODIFY
 *   ============================================================================
 *  */

declare namespace SlimCore {
    namespace Enums {
        
        enum CallType {
            CallTypeGroup,
            CallTypeS2s,
            CallTypePstn,
        }
        
        enum VideoStatus {
            NotAvailable,
            Available,
            Starting,
            Running,
            Stopping,
            Paused,
            NotStarted,
            None,
        }
        
        enum VideoType {
            ScreenShare,
            Video,
            Augmented,
        }
        
        enum DeviceType {
            UsbCamera,
            CaptureAdapter,
            Virtual,
            SRAugmented,
        }
        
        enum CameraFacing {
            Unknown,
            External,
            Front,
            Back,
            Panoramic,
            LeftFront,
            RightFront,
        }
        
        enum ContentSharingStatus {
            Initial,
            Routing,
            Ringing,
            Presenting,
            Connected,
            Viewing,
            Finishing,
            Done,
            Failed,
            TimedOut,
        }
        
        enum ContentSharingFailureReason {
            NoFailure,
            Failure,
            SessionNotFound,
            SessionTimedOut,
            NetworkError,
            NetworkCannotConnectError,
            AuthFailure,
            ServiceFailure,
            RequestTimedOut,
            ActionNotAllowed,
            Forbidden,
        }
        
        enum ContentSharingRole {
            None,
            Attendee,
            Presenter,
        }
        
        enum DataChannelStatus {
            Unknown,
            Available,
            Starting,
            Active,
            Stopping,
            NotStarted,
        }
        
        enum CallStatus {
            Unplaced,
            Routing,
            RingingOut,
            RingingIn,
            EarlyMedia,
            InProgress,
            InLobby,
            LocalHold,
            RemoteHold,
            Finished,
            Cancelled,
            Refused,
            Busy,
            Missed,
            Dropped,
            Failed,
            CallTimedOut,
            CallForwardingInitiated,
            VmRedirectInitiated,
            VmBufferingGreeting,
            VmPlayingGreeting,
            VmRecording,
            VmUploading,
            VmSent,
            VmCancelled,
            VmFailed,
            Transferring,
            Transferred,
            DeniedInLobby,
            TimedOutInLobby,
            Parking,
            Parked,
            Preheating,
            Preheated,
            Observing,
        }
        
        enum ParticipantFailureReason {
            NoFailure,
            MiscError,
            RecipientUserNotFound,
            RecipientNotOnline,
            SoundRecordingError,
            SoundPlaybackError,
            RemoteSoundIOError,
            RecipientBlocked,
            CallerNotFriend,
            CallerNotAuthorized,
            HostEndedConf,
            ConfParticipantCountLimitReached,
            AnsweredElsewhere,
            PstnNoSkypeoutSubscription,
            PstnInsufficientFunds,
            PstnInternetConnectionLost,
            PstnSkypeoutAccountBlocked,
            PstnCouldNotConnectToSkypeProxy,
            PstnBlockedByUs,
            PstnBlockedRegulatoryIndia,
            PstnInvalidNumber,
            PstnNumberForbidden,
            PstnCallTimedOut,
            PstnBusy,
            PstnCallTerminated,
            PstnNetworkError,
            PstnNumberUnavailable,
            PstnCallRejected,
            PstnEmergencyCallDenied,
            PstnMiscError,
            CallNotFound,
            TrouterError,
            MediaDroppedError,
            PstnNoSubscriptionCover,
            CallNotificationDeliveryFailure,
            PstnCreditExpired,
            PstnCreditExpiredButEnough,
            EnterprisePstnInternalError,
            EnterprisePstnUnavailable,
            EnterprisePstnForbidden,
            EnterprisePstnInvalidNumber,
            EnterprisePstnMiscError,
            Kicked,
            NetworkRequestTimeoutError,
            CallDoesNotExist,
            MediaSetupFailure,
            ServiceUnavailable,
            SignalingError,
            ConversationEstablishmentFailed,
            TemporarilyUnavailable,
            GeneralNetworkError,
            NetworkCannotConnectError,
            NoSignalingFromPeer,
            AnonymousJoinDisabledByPolicy,
            NoLobbyForBroadcastJoin,
            NotAllowedDueToInformationBarrier,
            BroadcastLimitReached,
            B2bJoinDisabledByPolicy,
            LocationBasedRoutingError,
            ConfLobbyParticipantCountLimitReached,
            Forbidden,
        }
        
        enum OriginType {
            Unspecified,
            Transfer,
            Park,
            TransferToVoicemail,
        }
        
        enum IdentityType {
            Unrecognized,
            Skype,
            Pstn,
            Emergency,
            Undisclosed,
            Lync,
            Bot,
        }
        
        enum CompositeAudioDeviceType {
            Speakers,
            Headphones,
            Headset,
            Handset,
            Speakerphone,
        }
        
        enum MediaType {
            Audio,
            Video,
            PanoramicCamera,
            AppSharing,
            Data,
        }
        
        enum AccountStatus {
            LoggedOut,
            LoggingIn,
            LoggedIn,
            LoggingOut,
        }
        
        enum LoginRequestResult {
            Rejected,
            Accepted,
            Ignored,
        }
        
        enum Intent {
            Regular,
            CallPush,
            CallUser,
            CallPreheat,
            MediaInit,
        }
        
        enum ServiceType {
            Testing,
            MicrosoftWNS,
            MicrosoftWP7NS,
            AppleAPN,
            GoogleAGCM,
            Hotmail,
            GoogleAC2DM,
            Trouter,
            Griffin,
            ADM,
            NNA,
        }
        
        enum PushHandlingResult {
            BadNotificationPayload,
            CallSetupSucceeded,
            CallSetupFailed,
            BadNotificationEventType,
            CallSetupSucceededCallAlreadyExists,
            CallSetupFailedCannotConnect,
            CallSetupFailedNoSignaling,
            CallSetupFailedNoPermission,
            CallSetupFailedNoCommonCodec,
            CallSetupFailedConflict,
            CallSetupFailedPushIgnored,
            CallSetupFailedAnsweredElsewhere,
            CallSetupFailedAlreadyEnded,
            CallSetupProgress,
        }
        
        enum DtmfTone {
            Num0,
            Num1,
            Num2,
            Num3,
            Num4,
            Num5,
            Num6,
            Num7,
            Num8,
            Num9,
            Star,
            Pound,
            A,
            B,
            C,
            D,
            Flash,
        }
        
        enum ModalityType {
            Audio,
            Video,
            Screenshare,
            Datachannel,
        }
        
        enum MediaDirection {
            Disabled,
            Inactive,
            SendToPeer,
            ReceiveFromPeer,
            Bidirectional,
        }
        
        enum MediaStreamState {
            StreamCreated,
            StreamRemoved,
            StreamStarted,
            StreamInactive,
            StreamActive,
            StreamStopped,
            StreamFail,
        }
        
        enum MuteFlags {
            MuteMicrophone = 1,
            MuteSpeaker = 2,
        }
        
        enum PreheatFlags {
            IsPreheatOnly = 1,
        }
        
        enum MediaNegotiationStatusCode {
            Succeeded,
            ErrorLocalInternal,
            ErrorRemoteInternal,
            OfferNotAcceptable,
            OfferDeclined,
            LocalCancel,
            RemoteCancel,
            FailedNoRetry,
            Terminated,
            GeneralFailure,
        }
        
        enum AnswerMediaType {
            AnswerWithAudioOnly,
            AnswerWithAudioVideo,
            AnswerWithScreenshareOnly,
        }
        
        enum Capability {
            None,
            Conference,
            ShareScreen,
            Merge,
            All,
        }
        
        enum SelfCapability {
            None,
            UnmuteSelf,
            MuteOthers,
            All,
        }
        
        enum EndpointType {
            Default,
            Lync,
            Voicemail,
        }
        
        enum MuteScope {
            All,
            Specified,
        }
        
        enum RemoveEndpointScope {
            RemoveEndpointScopeNone,
            RemoveEndpointScopeOther,
            RemoveEndpointScopeSpecified,
        }
        
        enum MediaPeerType {
            ConsumerTwoParty,
            ConsumerPstn,
            ConsumerMultiParty,
            EnterpriseTwoPartyOnlineOnly,
            EnterpriseTwoPartyHybrid,
            EnterpriseMultiParty,
            EnterprisePstnOnlineOnly,
            EnterprisePstnHybrid,
            EnterpriseFederated,
            EnterpriseUnknown,
            EnterpriseMultiPartyBroadcasting,
        }
        
        enum CallQualityRating {
            VeryBad,
            Bad,
            Average,
            Good,
            VeryGood,
        }
        
        enum AudioUsageMode {
            Default,
            LongrangeSpeaker,
            Auditorium,
        }
        
        enum OperationResultCode {
            None,
            Failure,
            Success,
        }
        
        enum ConnectionType {
            AllSupported,
            NoDirectConnection,
        }
        
        enum InvitationType {
            None,
            Nudge,
            Dialout,
        }
        
        enum ParkContext {
            Invalid,
            Team,
            Sharedline,
            Serverhold,
        }
        
        enum TransferType {
            TransferStandard,
            TransferToVoicemail,
        }
        
        enum LocationInfoType {
            NoLocationInfo,
            LocationContent,
            NetworkContent,
        }
        
        enum Property {
            VideoStatus,
            VideoError,
            VideoType,
            VideoCallObjectId,
            VideoParticipantObjectId,
            VideoRank,
            VideoEndpointId,
            VideoParticipantLegId,
            VideoParticipantMri,
            VideoNegotiationTag,
            ContentSharingCallId,
            ContentSharingIdentity,
            ContentSharingStatus,
            ContentSharingId,
            ContentSharingState,
            ContentSharingFailureReason,
            ContentSharingFailureCode,
            ContentSharingFailureSubCode,
            DataChannelStatus,
            ParticipantIdentity,
            ParticipantDisplayName,
            ParticipantPricePerMinute,
            ParticipantPricePrecision,
            ParticipantPriceCurrency,
            ParticipantType,
            ParticipantStatus,
            ParticipantFailureReason,
            ParticipantPstnFeedback,
            ParticipantDebugInfo,
            ParticipantCountry,
            ParticipantMriIdentity,
            ParticipantVideoCountChanged,
            ParticipantIsActiveSpeaker,
            ParticipantDominantSpeakerRank,
            ParticipantSponsor,
            ParticipantContentRole,
            ParticipantEndpointDetails,
            ParticipantCapabilities,
            ParticipantEndpointType,
            ParticipantAcceptedBy,
            ParticipantDiagnosticsCode,
            ParticipantIsServerMuted,
            ParticipantAdmitFailureReason,
            ParticipantRemoveFailureReason,
            ParticipantRole,
            ParticipantMeetingRole,
            ParticipantTenantId,
            ParticipantSecondsLeft,
            ParticipantLimitingFactor,
            ParticipantBalanceUpdate,
            CallTopic,
            CallIsMuted,
            CallIsServerMuted,
            CallIsMutedSpeaker,
            CallIsHostless,
            CallActiveMembers,
            CallIsActive,
            CallName,
            CallIsIncoming,
            CallIsConference,
            CallIsOnHold,
            CallOptimalRemoteVideoCount,
            CallMessageId,
            CallStatus,
            CallThreadId,
            CallLegId,
            CallConversationType,
            CallDataChannelObjectId,
            CallEndpointDetails,
            CallerMriIdentity,
            CallMemberCountChanged,
            CallTransferStatus,
            CallTransferFailureReason,
            CallForwardingDestinationType,
            CallIncomingType,
            CallOnBehalfOfMri,
            CallTransferorMri,
            CallIsIncomingOneOnOneVideoCall,
            CallQueueInfo,
            CallTransferorType,
            CallTransferorDisplayName,
            CallInvitationData,
            CallMeetingDetails,
            SelfParticipantRole,
            SelfParticipantTenantId,
            CallBroadcastMetadata,
            CallContentSharingSessionCountChanged,
            CallFailureReason,
            SelfMeetingRole,
            CallProgressStatus,
            CallConsultativeTransferCallId,
            CallParkStatus,
            CallParkFailureReason,
            CallParkPickupCode,
            CallOrigin,
            CallEndDiagnosticsCode,
            TransferDiagnosticsCode,
            CallServerHoldLocation,
            CallAccountIdentity,
            CallCapabilities,
            CallActiveVideoChannelCount,
            AccountStatus,
        }
        
        enum ObjectType {
            Video,
            ContentSharing,
            DataChannel,
            Participant,
            Call,
            Account,
            CallHandler,
        }
    }
}
