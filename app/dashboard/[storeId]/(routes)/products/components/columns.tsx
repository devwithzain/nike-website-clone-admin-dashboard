"use client";
import CellAction from "./cell-action";
import { TproductColumnProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TproductColumnProps>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "isArchived",
		header: "Archived",
	},
	{
		accessorKey: "isFeatured",
		header: "Featured",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "subcategory",
		header: "Sub Category",
	},
	{
		accessorKey: "size",
		header: "Size",
	},
	{
		accessorKey: "color",
		header: "Color",
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
