import { create } from 'zustand'

interface ChatState {

    contact: IContact | null;
    setContact: (contact: IContact | null) => void;
    chat: IMessages | null;
    setChat: (chat: IMessages | null) => void;
    currentConversation: IConversation | null;
    setCurrentConversation: (currentConversation: IConversation | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    contact: null,
    setContact: (contact: IContact | null) => set({ contact }),
    chat: null,
    setChat: (chat: IMessages | null) => set({ chat }),
    currentConversation: null,
    setCurrentConversation: (currentConversation: IConversation | null) => set({ currentConversation })
}))