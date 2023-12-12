import { create } from "zustand";

interface useModalStore {
	link: string;
	setLink: (link: string) => void;
	isEditing: boolean;
	setIsEditing: (edit: boolean) => void;
	isOpen: boolean;
	setIsOpen: () => void;
}

export const useModal = create<useModalStore>((set) => ({
	link: "",
	setLink: (link) => set(() => ({ link })),
	isEditing: false,
	setIsEditing: (edit) => set(() => ({ isEditing: edit })),
	isOpen: false,
	setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
