import { formatter } from "@/lib/utils";
import Overview from "@/components/overview";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import getGraphRevenue from "@/action/get-graph-revenue";
import { getSalesCount } from "@/action/get-sales-count";
import { getStockCount } from "@/action/get-stock-count";
import { getTotalRevenue } from "@/action/get-total-revenue";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage({
	params,
}: {
	params: { storeId: string };
}) {
	const stockCount = await getStockCount(params.storeId);
	const salesCount = await getSalesCount(params.storeId);
	const graphData = await getGraphRevenue(params.storeId);
	const totalRevenue = await getTotalRevenue(params.storeId);
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Heading
					title="Dashboard"
					description="Overview of your store"
				/>
				<Separator />
				<div className="grid gap-4 grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-semibold">
								Total Revenue
							</CardTitle>
							<DollarSign className="h-6 w-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatter.format(totalRevenue)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-semibold">Sales</CardTitle>
							<CreditCard className="h-6 w-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{salesCount}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-semibold">
								Products In Stock
							</CardTitle>
							<Package className="h-6 w-6 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stockCount}</div>
						</CardContent>
					</Card>
				</div>
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<Overview data={graphData} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
