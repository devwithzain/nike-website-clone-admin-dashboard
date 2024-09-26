"use client";
import { useEffect } from "react";
import { useStoreModal } from "@/hooks";

export default function Dashboard() {
	const onOpen = useStoreModal((state) => state.onOpen);
	const isOpen = useStoreModal((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [onOpen, isOpen]);

	return <>Dashboard Page</>;
}
