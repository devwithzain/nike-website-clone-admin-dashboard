"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { TCategoryColumnProps } from "@/types";
import { useRouter, useParams } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CellAction({ data }: { data: TCategoryColumnProps }) {
	const router = useRouter();
	const params = useParams();
	const [open, setOpen] = useState(false);
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Category id copied to the clipboard");
	};

	const onDelete = async () => {
		try {
			await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
			toast.success("Category deleted.");
		} catch (error) {
			toast.error(
				"Make sure you remove all products using this category first.",
			);
		} finally {
			router.refresh();
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						className="flex items-center gap-x-2"
						onClick={() => onCopy(data.id)}>
						<Copy className="w-4 h-4" />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex items-center gap-x-2"
						onClick={() =>
							router.push(`/dashboard/${params.storeId}/categories/${data.id}`)
						}>
						<Edit className="w-4 h-4" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex items-center gap-x-2"
						onClick={() => setOpen(true)}>
						<Trash className="w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
