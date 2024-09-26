"use client";

import Modal from "@/components/modal";
import { useStoreModal } from "@/hooks/user-store-modal";

export default function StoreModal() {
	const useStore = useStoreModal();

	return (
		<Modal
			title="Create Store"
			description="Add a new store to manage products and categories"
			isOpen={useStore.isOpen}
			onClose={useStore.onClose}>
			Future create store
		</Modal>
	);
}
