"use client";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { TcolorColumnProps } from "@/types";
import Heading from "@/components/ui/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-tabel";

export default function ColorClient({ data }: { data: TcolorColumnProps[] }) {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Colors (${data.length})`}
					description="Manage colors for your products"
				/>
				<Button
					onClick={() =>
						router.push(`/dashboard/${params.storeId}/colors/new`)
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
				description="API Calls for Colors"
			/>
			<Separator />
			<ApiList
				entityName="colors"
				entityIdName="colorId"
			/>
		</>
	);
}
