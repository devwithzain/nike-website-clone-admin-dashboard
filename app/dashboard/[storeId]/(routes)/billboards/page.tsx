import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import BillboardsClient from "./components/client";
import { TBillboardColumnProps } from "@/types";

export default async function Billboards({
	params,
}: {
	params: { storeId: string };
}) {
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formatedBillboards: TBillboardColumnProps[] = billboards.map(
		(billboard) => ({
			id: billboard.id,
			label: billboard.label,
			createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
		}),
	);
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardsClient data={formatedBillboards} />
			</div>
		</div>
	);
}
