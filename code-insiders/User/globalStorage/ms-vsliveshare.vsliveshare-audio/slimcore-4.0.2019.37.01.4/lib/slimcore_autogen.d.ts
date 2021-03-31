/*   ============================================================================
 *                         GENERATED FILE - DO NOT MODIFY
 *   ============================================================================
 *  */

/// <reference path="slimcore-enums_autogen.d.ts" />
/// <reference path="slimcore-enums.d.ts" />

declare namespace SlimCore {
    
    namespace Engine {
        namespace Events {
            type ProbeDevicesStatusChangedArgs = {
                ready: boolean;
            };
            
            type PushHandlingCompleteArgs = {
                token: number;
                result: Enums.PushHandlingResult;
            };
            
            type SkypeTokenRequiredArgs = {
                invalidToken: string;
            };
            
            type ProxiedPushNotificationArgs = {
                eventId: number;
                payload: string;
            };
            
            type LoggingEventArgs = {
                message: string;
                auxiliaryPayload: string;
            };
            
        }
        
        interface Events {
            "probe-devices-status-changed": Events.ProbeDevicesStatusChangedArgs;
            "push-handling-complete": Events.PushHandlingCompleteArgs;
            "skype-token-required": Events.SkypeTokenRequiredArgs;
            "proxied-push-notification": Events.ProxiedPushNotificationArgs;
            "logging-event": Events.LoggingEventArgs;
        }
        
    }
    
    interface Engine extends Disposable, EventEmitter<Engine.Events> {
        getIntProperty(objectId: number, propKey: Enums.Property): number;
        getStrProperty(objectId: number, propKey: Enums.Property): string;
        setEcsConfig(ecsBlob: string, userIdentity: string, etag: string, isCached?: boolean): void;
        shouldTriggerCQF(username: string, callId: string, callType: Enums.CallType): boolean;
        getSpeakerVolume(): number;
        getSpeakerSystemVolume(): number;
        setSpeakerVolume(volume: number): void;
        setSpeakerSystemVolume(volume: number): void;
        unmuteMicrophone(): void;
        unmuteSpeaker(): void;
        getNrgLevelsForDeviceTuner(microphone: string): number;
        getRegistrationId(accountIdentity?: string): string;
        ecsGetETag(): string;
        getBuildName(): string;
        getBuildVersion(): string;
        getE911Info(): string;
        handleLoggingEvent(message: string, auxiliaryPayload: string): void;
    }
    
    namespace ContentSharing {
        namespace Events {
            type ContentSharingSessionStateUpdateResultArgs = {
                id: string;
                failureReason: Enums.ContentSharingFailureReason;
                code: number;
                subCode: number;
            };
            
            type ContentSharingResultArgs = {
                failureReason: Enums.ContentSharingFailureReason;
                code: number;
                subCode: number;
            };
            
        }
        
        interface Events {
            "update-session-state-result": Events.ContentSharingSessionStateUpdateResultArgs;
            "take-control-result": Events.ContentSharingResultArgs;
            "update-participant-state-result": Events.ContentSharingResultArgs;
            "join-result": Events.ContentSharingResultArgs;
        }
        
    }
    
    interface ContentSharing extends Disposable, EventEmitter<ContentSharing.Events> {
        startContentSharing(): void;
        updateContentSharingSessionState(id: string, sessionState: string): void;
        takeContentSharingControl(): void;
        updateContentSharingParticipantState(): void;
        stopContentSharing(): void;
    }
    
    namespace Account {
        namespace Events {
            type SkypeTokenRequiredArgs = {
                invalidToken: string;
            };
            
        }
        
        interface Events {
            "skype-token-required": Events.SkypeTokenRequiredArgs;
        }
        
    }
    
    interface Account extends Disposable, EventEmitter<Account.Events> {
        getObjectId(): number;
        login(skypeToken: string, displayName?: string, configuration?: string): Enums.LoginRequestResult;
        logout(): void;
        updateSkypeToken(skypeToken: string): void;
        setAdditionalIdentities(identities: string): void;
        setRing(ring: string): void;
        setTenantId(tenantId: string): void;
        updateDisplayName(displayName: string): void;
        setConfiguration(configuration: string): void;
    }
    
    namespace CallHandler {
        namespace Events {
            type TransferRequestedArgs = {
                callObjectId: ObjectId;
                targetCallObjectId: ObjectId;
                transferorMri: string;
                transferTargetMri: string;
            };
            
            type AudioStreamStateChangedArgs = {
                callObjectId: ObjectId;
                direction: Enums.MediaDirection;
                streamState: Enums.MediaStreamState;
            };
            
            type CallMeBackOperationStatusChangedArgs = {
                callObjectId: ObjectId;
                participantMri: string;
                failureReason: number;
                code: number;
                subCode: number;
                phrase: string;
                causeId: string;
            };
            
            type UnmuteSelfOperationStatusChangedArgs = {
                callObjectId: ObjectId;
                operationResult: Enums.OperationResultCode;
                failureReason: number;
            };
            
            type RemoteVideosCountChangedArgs = {
                participantObjectId: ObjectId;
            };
            
            type MediaNegotiationStatusChangedArgs = {
                callObjectId: ObjectId;
                modalityType: Enums.ModalityType;
                mediaNegotiationStatusCode: Enums.MediaNegotiationStatusCode;
                causeId: string;
            };
            
            type NudgeParticipantsOperationStatusChangedArgs = {
                callObjectId: ObjectId;
                context: string;
                failureReason: number;
            };
            
            type ActiveSpeakerListChangedArgs = {
                callObjectId: ObjectId;
                activeSpeakers: string[];
            };
            
            type DominantSpeakerListChangedArgs = {
                callObjectId: ObjectId;
                dominantSpeakers: string[];
            };
            
            type ProxiedPushNotificationArgs = {
                eventId: number;
                payload: string;
            };
            
            type UpdateMeetingRolesOperationStatusChangedArgs = {
                callObjectId: ObjectId;
                causeId: string;
                code: number;
                subCode: number;
                phrase: string;
            };
            
            type MuteParticipantsOperationStatusChangedArgs = {
                callObjectId: ObjectId;
                causeId: string;
                code: number;
                subCode: number;
                phrase: string;
            };
            
            type RemoteUserEventsReceivedArgs = {
                callObjectId: ObjectId;
                participantId: string;
                events: string;
            };
            
            type OperationStatusChangedArgs = {
                callObjectId: ObjectId;
                result: string;
            };
            
        }
        
        interface Events {
            "transfer-requested": Events.TransferRequestedArgs;
            "audio-stream-state-changed": Events.AudioStreamStateChangedArgs;
            "callmeback-operation-status-changed": Events.CallMeBackOperationStatusChangedArgs;
            "unmuteself-operation-status-changed": Events.UnmuteSelfOperationStatusChangedArgs;
            "remote-videos-count-changed": Events.RemoteVideosCountChangedArgs;
            "media-negotiation-status-changed": Events.MediaNegotiationStatusChangedArgs;
            "nudge-participants-operation-status-changed": Events.NudgeParticipantsOperationStatusChangedArgs;
            "active-speaker-list-changed": Events.ActiveSpeakerListChangedArgs;
            "dominant-speaker-list-changed": Events.DominantSpeakerListChangedArgs;
            "proxied-push-notification": Events.ProxiedPushNotificationArgs;
            "update-meeting-roles-operation-status-changed": Events.UpdateMeetingRolesOperationStatusChangedArgs;
            "mute-participants-operation-status-changed": Events.MuteParticipantsOperationStatusChangedArgs;
            "remote-user-events-received": Events.RemoteUserEventsReceivedArgs;
            "operation-status-changed": Events.OperationStatusChangedArgs;
        }
        
    }
    
    interface CallHandler extends Disposable, EventEmitter<CallHandler.Events> {
        getActiveCalls(): ObjectId[];
        unsubscribe(callObjectId: ObjectId): void;
        leaveCall(callObjectId: ObjectId): void;
        callGetParticipants(callObjectId: ObjectId): ObjectId[];
        removeParticipant(participantObjectId: ObjectId, removeEndpointScope?: Enums.RemoveEndpointScope): void;
        callMute(callObjectId: ObjectId, mute?: boolean): void;
        callMuteParticipants(callObjectId: ObjectId, muteScope: Enums.MuteScope, participantList: string[], causeId?: string): void;
        callMuteSpeaker(callObjectId: ObjectId, mute?: boolean): void;
        callHold(callObjectId: ObjectId, hold?: boolean, negotiationTag?: string): void;
        callSendDtmf(callObjectId: ObjectId, dtmfTone: Enums.DtmfTone): void;
        callAttachSendVideo(callObjectId: ObjectId, videoObjectId: ObjectId): void;
        callGetSendVideos(callObjectId: ObjectId): ObjectId[];
        callGetParticipantVideos(callParticipantObjectId: ObjectId): ObjectId[];
        callParticipantGetCallObject(callParticipantObjectId: ObjectId): ObjectId;
        getDebugInformation(command: string): string;
        callAssimilate(callObjectId1: ObjectId, callObjectId2: ObjectId, threadId?: string, messageId?: string): void;
        startCallTransfer(callObjectId: ObjectId, participantId: string, transferType?: Enums.TransferType): void;
        startConsultativeCallTransfer(consultativeCallObjectId: ObjectId, transfereeCallObjectId: ObjectId): void;
        startTransferTargetCall(callObjectId: ObjectId, isVideoEnabled?: boolean, threadId?: string, messageId?: string): void;
        endCallForAll(callObjectId: ObjectId): void;
        createContentSharing(callObjectId: ObjectId, contentSharingGuid: string, contentSharingIdentity: string, subject?: string, initialContentSharingSessionState?: string): ObjectId;
        getContentSharingSessions(callObjectId: ObjectId): ObjectId[];
        callShareSystemSound(callObjectId: ObjectId, enable: boolean): void;
        admitParticipants(callObjectId: ObjectId, participantList: string[]): void;
        addParticipantToCall(callObjectId: ObjectId, participant: string, threadId?: string, messageId?: string, additionalData?: string, disableUnmute?: boolean, causeId?: string): ObjectId;
        callMeBack(callObjectId: ObjectId, participantMri: string, assertedId: string, causeId?: string): void;
        provideCallQualityFeedback(callId: string, participantId: string, questionaryId: string, trackingReason: string, rating: Enums.CallQualityRating, problemTokens: string): void;
        callSetAudioUsageMode(callObjectId: ObjectId, audioUsageMode: Enums.AudioUsageMode): void;
        removeParticipantByMri(callObjectId: ObjectId, participantMri: string, endpoint?: string, removeEndpointScope?: Enums.RemoveEndpointScope): void;
        callGetTechnicalInformationJson(callObjectId: ObjectId): string;
        callStartAudio(callObjectId: ObjectId, negotiationTag?: string): void;
        callStopAudio(callObjectId: ObjectId, negotiationTag?: string): void;
        callSetMaxVideoChannels(callObjectId: ObjectId, maxVideoChannels: number, negotiationTag: string, causeId?: string): void;
        startCallPark(callObjectId: ObjectId, parkContext: Enums.ParkContext): void;
        startCallUnpark(callGuid: string, callProperties: CallProperties, parkContext: Enums.ParkContext, pickupCode: string): ObjectId;
        updateMeetingRoles(callObjectId: ObjectId, participantList: string[], meetingRole?: string, causeId?: string): void;
        joinPreheatedCall(callObjectId: ObjectId, causeId?: string, muteFlags?: number): void;
        callMerge(callObjectId1: ObjectId, callObjectId2: ObjectId, threadId?: string, messageId?: string, causeId?: string): void;
        addParticipantsToCall(callObjectId: ObjectId, participantList: string[], threadId?: string, messageId?: string, additionalData?: string, disableUnmute?: boolean, causeId?: string): ObjectId[];
        addGroupModality(callObjectId: ObjectId, threadId?: string, messageId?: string, additionalData?: string, causeId?: string): void;
        mergeCall(callObjectId: ObjectId, pickupCode?: string, threadId?: string, messageId?: string, causeId?: string): void;
        answer(callObjectId: ObjectId, mediaStateConfigurationJson?: string): void;
        consultativeTransferWithOptions(transfereeCallObjectId: ObjectId, pickupCode?: string, consultativeCallObjectId?: ObjectId, causeId?: string): void;
        setLocationInfo(infoType: Enums.LocationInfoType, contentJson?: string): void;
    }
    
    interface CallProperties {
        audioDirection?: Enums.MediaDirection;
        videoDirection?: Enums.MediaDirection;
        screenshareDirection?: Enums.MediaDirection;
        datachannelDirection?: Enums.MediaDirection;
        threadId?: string;
        messageId?: string;
        isVideoEnabled?: boolean;
        isGoLive?: boolean;
        isHostless?: boolean;
        enableGroupCallMeetupGeneration?: boolean;
        subject?: string;
        conversationType?: string;
        meetingInfo?: string;
        endpointMetadata?: string;
        onBehalfOf?: string;
        enableLightWeightMeeting?: boolean;
        emergencyContent?: string;
        broadcastContext?: string;
        participantLegId?: string;
        callKey?: string;
        encryptedKey?: string;
        connectionType?: Enums.ConnectionType;
        invitationType?: Enums.InvitationType;
        maxVideoChannels?: number;
        mediaPeerType?: Enums.MediaPeerType;
        muteFlags?: number;
        negotiationTag?: string;
        routingFlags?: string[];
        debugInfo?: string;
        scenario?: string;
        preheatFlags?: number;
        mediaConfigurationJson?: string;
        mediaStateConfigurationJson?: string;
    }
}
