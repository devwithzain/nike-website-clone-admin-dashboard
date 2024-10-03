"use client";
import CellAction from "./cell-action";
import { TsizeColumnProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TsizeColumnProps>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "value",
		header: "Value",
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
