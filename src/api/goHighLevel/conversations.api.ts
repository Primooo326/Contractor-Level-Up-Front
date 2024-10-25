import { CONTRACTOR_LOCATION_ID } from "@/config";
import { fetchApiContractor } from "../instances";


export async function getConversations(): Promise<IConversationsReturn> {
    return fetchApiContractor.get(`conversations/search?locationId=${CONTRACTOR_LOCATION_ID}`);
}