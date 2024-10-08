"use client";

import CellAction from "./cell-action";
import { TcolorColumnProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TcolorColumnProps>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "value",
		header: "Value",
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.value}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		),
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
