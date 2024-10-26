import { IUser } from "@/models/IUser.model";
import { create } from "zustand"

interface useUserState {
    userToEdit: IUser | null;
    setUserToEdit: (userToEdit: IUser | null) => void;
}

export const useUserStore = create<useUserState>((set) => ({
    userToEdit: null,
    setUserToEdit: (userToEdit) => set({ userToEdit }),
}));