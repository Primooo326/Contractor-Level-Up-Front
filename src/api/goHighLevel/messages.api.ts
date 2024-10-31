
import { fetchApiContractor } from "../instances";

export async function getMessagesByConversationId(conversationId: string): Promise<IMessagesResponse> {
    return fetchApiContractor.get(`conversations/${conversationId}/messages?limit=100`);
}

export async function sendMessage(message: ISendMessageBody): Promise<ISendMessageResponse> {
    return fetchApiContractor.post(`conversations/messages`, message);
}

export async function getMessagesById(id: string): Promise<IMessageResponse> {
    return fetchApiContractor.get(`conversations/messages/${id}`);
}