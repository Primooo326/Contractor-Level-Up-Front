
import { NOTION_DATABASE_ID } from "@/config";
import { fetchApiBase, fetchApiContractor, fetchApiNotion } from "../instances";
import { IResponseApiOne } from "@/models/IResponseApi.model";

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

export async function uploadFiles(file: File): Promise<IResponseApiOne<string>> {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApiBase.post(
        `files/upload`,
        formData,
        {
            "Content-Type": "multipart/form-data",
        }
    );
}
