"use client";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import Heading from "@/components/ui/heading";
import { TsubCategoryColumnProps } from "@/types";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-tabel";

export default function SubCategoryClient({
	data,
}: {
	data: TsubCategoryColumnProps[];
}) {
	const router = useRouter();
	const params = useParams();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sub Categories (${data.length})`}
					description="Manage Sub Categories for your store"
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() =>
						router.push(`/dashboard/${params.storeId}/subcategories/new`)
					}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey="name"
			/>
			<Heading
				title="API"
				description="API calls for Sub Categories"
			/>
			<Separator />
			<ApiList
				entityIdName="subcategoryId"
				entityName="subcategories"
			/>
		</>
	);
}
