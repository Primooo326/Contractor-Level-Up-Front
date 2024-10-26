interface IAttributionSource {
    sessionSource: string;
    medium: string;
}

interface ICreatedBy {
    source: string;
    channel: string;
    sourceId: string;
    timestamp: string;
}

interface IDndSetting {
    status: string;
    message: string;
}

interface IDndSettings {
    SMS: IDndSetting;
    Call: IDndSetting;
    Email: IDndSetting;
    WhatsApp: IDndSetting;
    FB: IDndSetting;
    GMB: IDndSetting;
}

interface IContact {
    id: string;
    dateAdded: string;
    type: string;
    locationId: string;
    firstName: string;
    firstNameLowerCase: string;
    fullNameLowerCase: string;
    lastName: string;
    lastNameLowerCase: string;
    email: string;
    emailLowerCase: string;
    phone: string;
    country: string;
    attributionSource: IAttributionSource;
    createdBy: ICreatedBy;
    followers: string[];
    assignedTo: string;
    dndSettings: IDndSettings;
    dnd: boolean;
    tags: string[];
    dateUpdated: string;
    customFields: any[];
    additionalEmails: any[];
    additionalPhones: any[];
}

interface IContactResponse {
    contact: IContact;
    traceId: string;
}
