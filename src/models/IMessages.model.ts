interface IMessageMeta {
    email?: {
        messageIds: string[];
    };
    call?: {
        duration: number;
        status: string;
    };
}

interface IMessage {
    id: string;
    type: number;
    locationId: string;
    contactId: string;
    contentType?: string;
    conversationId: string;
    dateAdded: string;
    userId: string;
    meta?: IMessageMeta;
    source: string;
    messageType: EMessageType;
    direction?: string;
    status?: string;
    body?: string;
    attachments?: any[];
}

interface IMessages {
    lastMessageId: string;
    nextPage: boolean;
    messages: IMessage[];
}

interface IMessagesResponse {
    messages: IMessages;
    traceId: string;
}
interface IMessageResponse {
    message: IMessage;
    traceId: string;
}
type EMessageType =
    | "TYPE_CALL"
    | "TYPE_SMS"
    | "TYPE_EMAIL"
    | "TYPE_SMS_REVIEW_REQUEST"
    | "TYPE_WEBCHAT"
    | "TYPE_SMS_NO_SHOW_REQUEST"
    | "TYPE_CAMPAIGN_SMS"
    | "TYPE_CAMPAIGN_CALL"
    | "TYPE_CAMPAIGN_EMAIL"
    | "TYPE_CAMPAIGN_VOICEMAIL"
    | "TYPE_FACEBOOK"
    | "TYPE_CAMPAIGN_FACEBOOK"
    | "TYPE_CAMPAIGN_MANUAL_CALL"
    | "TYPE_CAMPAIGN_MANUAL_SMS"
    | "TYPE_GMB"
    | "TYPE_CAMPAIGN_GMB"
    | "TYPE_REVIEW"
    | "TYPE_INSTAGRAM"
    | "TYPE_WHATSAPP"
    | "TYPE_CUSTOM_SMS"
    | "TYPE_CUSTOM_EMAIL"
    | "TYPE_CUSTOM_PROVIDER_SMS"
    | "TYPE_CUSTOM_PROVIDER_EMAIL"
    | "TYPE_IVR_CALL"
    | "TYPE_ACTIVITY_CONTACT"
    | "TYPE_ACTIVITY_INVOICE"
    | "TYPE_ACTIVITY_PAYMENT"
    | "TYPE_ACTIVITY_OPPORTUNITY"
    | "TYPE_LIVE_CHAT"
    | "TYPE_LIVE_CHAT_INFO_MESSAGE"
    | "TYPE_ACTIVITY_APPOINTMENT"
    | "TYPE_FACEBOOK_COMMENT"
    | "TYPE_INSTAGRAM_COMMENT"
    | "TYPE_CUSTOM_CALL"
    | "TYPE_ACTIVITY"



interface ISendMessageBody {
    type: "SMS" | "WhatsApp"
    contactId: string;
    appointmentId: string;
    message: string;
    subject: string;
    scheduledTimestamp: number;
    fromNumber: string;
    fromNumber2?: any;
    toNumber: string;
    templateId?: string;
    attachments: string[]
}

interface ICreateLogBody {
    toNumber: string
    messageContent: string;
}

interface ISendMessageResponse {
    conversationId: string;
    messageId: string;
    traceId: string;

}

interface IFromNumberResponse {
    data: string;
}

interface IValidateCountMessagesResponse {
    messagesSend: number;
    messagesAllowed: number;
    messagesMinute: number;
    canSendMessages: number;
    canSend: boolean;
    message: string;
}
// {
//     "messagesSend": 2,
//     "messagesAllowed": 100,
//     "messagesMinute": 1,
//     "canSendMessages": 99,
//     "canSend": true,
//     "message": "Puede enviar más mensajes."
// }
