
import { NOTION_DATABASE_ID } from "@/config";
import { fetchApiBase, fetchApiContractor, fetchApiNotion } from "../instances";

export async function getMessagesByConversationId(conversationId: string): Promise<IMessagesResponse> {
    return fetchApiContractor.get(`conversations/${conversationId}/messages?limit=100`);
}

export async function sendMessage(message: ISendMessageBody): Promise<ISendMessageResponse> {
    return fetchApiContractor.post(`conversations/messages`, message);
}

export async function createLog(message: ICreateLogBody): Promise<ISendMessageResponse> {
    return fetchApiBase.post(`messages-log/createLog`, message);
}
export async function validateCountMessages(amountSend: number): Promise<IValidateCountMessagesResponse> {
    return fetchApiBase.post(`messages-log/validateCount`, { amountSend });
}
export async function getMessagesById(id: string): Promise<IMessageResponse> {
    return fetchApiContractor.get(`conversations/messages/${id}`);
}

export async function validateFromNumber(email: string): Promise<IFromNumberResponse> {
    return fetchApiBase.post(`messages-log/validateFromNumber`, { email });
}