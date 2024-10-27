import { fetchApiContractor } from "../instances";

export async function getOneContact(contactId: string): Promise<IContactResponse> {
    return fetchApiContractor.get(`contacts/${contactId}`);
}
// https://services.leadconnectorhq.com/contacts/8R4rPddnuHQW0GyzUNhv

export async function searchContact(search: string): Promise<IContactSearchResponse> {
    return fetchApiContractor.get(`contacts/?locationId=7gcRvmSzndyAWZHzYU01&query=${search}`);
}