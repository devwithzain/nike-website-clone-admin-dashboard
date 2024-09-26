"use client";

import { TmodallProps } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function Modal({
	children,
	description,
	title,
	isOpen,
	onClose,
}: TmodallProps) {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}
