interface IAttributionSource {
    sessionSource: string;
    medium: string;
}

interface ICreatedBy {
    sourceId: string;
    channel: string;
    source: string;
    timestamp: string;
}

interface IContact {
    id: string;
    country: string;
    type: string;
    locationId: string;
    attributionSource: IAttributionSource;
    lastNameLowerCase: string;
    emailLowerCase: string;
    firstName: string;
    email: string;
    fullNameLowerCase: string;
    lastName: string;
    firstNameLowerCase: string;
    createdBy: ICreatedBy;
    dateAdded: string;
    phone: string;
    tags: string[];
    followers: string[];
    assignedTo: string;
    attachments: string[];
    dateUpdated: string;
    customFields: string[];
    additionalEmails: string[];
    additionalPhones: string[];
}

interface IContactResponse {
    contact: IContact;
    traceId: string;
}
