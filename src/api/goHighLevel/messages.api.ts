
// https://services.leadconnectorhq.com/conversations/{{ConversationId}}/messages
import { fetchApiContractor } from "../instances";


export async function getMessagesByConversationId(conversationId: string): Promise<IMessagesResponse> {
    return fetchApiContractor.get(`conversations/${conversationId}/messages?limit=100`);
}