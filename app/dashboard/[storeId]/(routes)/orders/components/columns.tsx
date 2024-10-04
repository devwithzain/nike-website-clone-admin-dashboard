"use client";

import { TorderColumnProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TorderColumnProps>[] = [
	{
		accessorKey: "products",
		header: "Products",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "totalPrice",
		header: "Total price",
	},
	{
		accessorKey: "isPaid",
		header: "Paid",
	},
];
