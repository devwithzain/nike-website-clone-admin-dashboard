"use client";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { TproductColumnProps } from "@/types";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

export default function ProductsClient({
	data,
}: {
	data: TproductColumnProps[];
}) {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${data.length})`}
					description="Manage products for your store"
				/>
				<Button
					onClick={() =>
						router.push(`/dashboard/${params.storeId}/products/new`)
					}>
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
				description="API Calls for Products"
			/>
			<Separator />
			<ApiList
				entityName="products"
				entityIdName="productId"
			/>
		</>
	);
}
