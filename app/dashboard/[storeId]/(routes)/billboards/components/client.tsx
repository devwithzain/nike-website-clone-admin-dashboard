"use client";

import { Plus } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

export default function BillboardsClient() {
	const router = useRouter();
	const params = useParams();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Billboards (0)"
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
		</>
	);
}
