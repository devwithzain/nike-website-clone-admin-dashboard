"use client";
import { useEffect } from "react";
import { useStoreModal } from "@/hooks";

export default function App() {
	const onOpen = useStoreModal((state) => state.onOpen);
	const isOpen = useStoreModal((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [onOpen, isOpen]);
	return null;
}
