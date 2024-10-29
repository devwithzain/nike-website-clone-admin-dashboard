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
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
