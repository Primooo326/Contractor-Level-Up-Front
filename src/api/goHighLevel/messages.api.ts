
import { fetchApiContractor } from "../instances";

export async function getMessagesByConversationId(conversationId: string): Promise<IMessagesResponse> {
    return fetchApiContractor.get(`conversations/${conversationId}/messages`);
}

export async function sendMessage(message: ISendMessageResponse): Promise<ISendMessageResponse> {
    return fetchApiContractor.post(`conversations/messages`, message);
}