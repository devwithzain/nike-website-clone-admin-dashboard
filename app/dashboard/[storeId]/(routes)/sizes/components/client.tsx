"use client";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import { TsizeColumnProps } from "@/types";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-tabel";

export default function SizesClient({ data }: { data: TsizeColumnProps[] }) {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes (${data.length})`}
					description="Manage sizes for your products"
				/>
				<Button
					onClick={() => router.push(`/dashboard/${params.storeId}/sizes/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable
				searchKey="name"
				columns={columns}
				data={data}
			/>
			<Heading
				title="API"
				description="API Calls for Sizes"
			/>
			<Separator />
			<ApiList
				entityName="sizes"
				entityIdName="sizeId"
			/>
		</>
	);
}
