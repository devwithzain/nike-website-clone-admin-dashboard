"use client";

import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { TBillboardColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-tabel";
import { columns } from "./columns";
import ApiList from "@/components/ui/api-list";

export default function BillboardsClient({
	data,
}: {
	data: TBillboardColumnProps[];
}) {
	const router = useRouter();
	const params = useParams();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Billboards (${data.length})`}
					description="Manage billboards for your store"
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() =>
						router.push(`/dashboard/${params.storeId}/billboards/new`)
					}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey="label"
			/>
			<Heading
				title="API"
				description="API calls for Billboards"
			/>
			<Separator />
			<ApiList
				entityIdName="billboardId"
				entityName="billboards"
			/>
		</>
	);
}
