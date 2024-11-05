import { create } from 'zustand';

interface ChatState {

    onModalTemplate: boolean;
    setOnModalTemplate: (isOpen: boolean) => void;
    messageType: { value: EMessageType, label: string }
    setMessageType: (messageType: { value: EMessageType, label: string }) => void;
    templateSelected: any | null;
    setTemplateSelected: (templateSelected: any) => void;
    contactsSelected: IConversation[];
    setContactsSelected: (contactsSelected: IConversation[] | ((prevMessages: IConversation[]) => IConversation[])) => void;
    messagesSent: any[];
    setMessagesSent: (messagesSent: any[] | ((prevMessages: any[]) => any[])) => void;
}

export const useChatStore = create<ChatState>((set) => ({

    onModalTemplate: false,
    setOnModalTemplate: (isOpen: boolean) => set({ onModalTemplate: isOpen }),
    messageType: { value: "TYPE_SMS", label: "SMS" },
    setMessageType: (messageType: { value: EMessageType, label: string }) => set({ messageType }),
    templateSelected: null,
    setTemplateSelected: (templateSelected: any | null) => set({ templateSelected }),
    contactsSelected: [],
    setContactsSelected: (contactsSelected: IConversation[] | ((prevMessages: IConversation[]) => IConversation[])) => set((state) => ({
        contactsSelected: typeof contactsSelected === 'function' ? contactsSelected(state.contactsSelected) : contactsSelected
    })),
    messagesSent: [],
    setMessagesSent: (messagesSent) => set((state) => ({
        messagesSent: typeof messagesSent === 'function' ? messagesSent(state.messagesSent) : messagesSent
    })),
}));
