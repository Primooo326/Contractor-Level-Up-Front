import { CONTRACTOR_LOCATION_ID } from "@/config";
import { fetchApiContractor } from "../instances";

export async function getConversations(startAfterDate?: number): Promise<IConversationsReturn> {
    const params = new URLSearchParams({
        locationId: CONTRACTOR_LOCATION_ID,
        sort: 'desc',
        sortBy: 'last_message_date',
        limit: '1',
    });

    if (startAfterDate) {
        params.append('startAfterDate', startAfterDate.toString());
    }

    return fetchApiContractor.get(`conversations/search?${params.toString()}`);
}

export async function getConversationByContactId(contactId: string): Promise<IConversationsReturn> {
    return fetchApiContractor.get(`conversations/search?locationId=${CONTRACTOR_LOCATION_ID}&contactId=${contactId}`);
}
