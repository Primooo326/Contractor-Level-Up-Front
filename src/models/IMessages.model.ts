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
    messageType: string;
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
