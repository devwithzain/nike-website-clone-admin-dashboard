"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TproductColumnProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CellAction({ data }: { data: TproductColumnProps }) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const params = useParams();

	const onConfirm = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/products/${data.id}`);
			toast.success("Product deleted.");
			router.refresh();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Product ID copied to clipboard.");
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
				loading={loading}
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
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/dashboard/${params.storeId}/products/${data.id}`)
						}>
						<Edit className="mr-2 h-4 w-4" /> Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="mr-2 h-4 w-4" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
