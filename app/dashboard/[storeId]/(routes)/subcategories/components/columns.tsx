"use client";

import CellAction from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TSubCategoryColumnProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TSubCategoryColumnProps>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "label",
		header: "Category",
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
