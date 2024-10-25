import { create } from 'zustand'

interface ChatState {
    chatId: string;
    contact: IContact | null;
    setChatId: (chatId: string) => void;
    setContact: (contact: IContact | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    chatId: '',
    contact: {
        id: "contact1",
        country: "US",
        type: "customer",
        locationId: "loc1",
        attributionSource: {
            sessionSource: "website",
            medium: "referral"
        },
        lastNameLowerCase: "doe",
        emailLowerCase: "john.doe@example.com",
        firstName: "John",
        email: "john.doe@example.com",
        fullNameLowerCase: "john doe",
        lastName: "Doe",
        firstNameLowerCase: "john",
        createdBy: {
            sourceId: "source1",
            channel: "web",
            source: "lead_form",
            timestamp: "2023-12-31T23:59:59Z"
        },
        dateAdded: "2022-12-31T23:59:59Z",
        phone: "123-456-7890",
        tags: ["customer", "support"],
        followers: ["user2", "user3"],
        assignedTo: "user1",
        attachments: [],
        dateUpdated: "2023-01-01T00:00:00Z",
        customFields: [],
        additionalEmails: [],
        additionalPhones: []
    },
    setChatId: (chatId: string) => set({ chatId }),
    setContact: (contact: IContact | null) => set({ contact })
}))