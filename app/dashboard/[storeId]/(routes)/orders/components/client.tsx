"use client";

import { columns } from "./columns";
import { TorderColumnProps } from "@/types";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";

export default function OrderClient({ data }: { data: TorderColumnProps[] }) {
	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description="Manage orders for your store"
			/>
			<Separator />
			<DataTable
				searchKey="products"
				columns={columns}
				data={data}
			/>
		</>
	);
}
