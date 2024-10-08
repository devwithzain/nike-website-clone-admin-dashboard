import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { formatter } from "@/lib/utils";
import { TorderColumnProps } from "@/types";
import OrderClient from "./components/client";

export default async function OrdersPage({
	params,
}: {
	params: { storeId: string };
}) {
	const orders = await prismadb.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formattedOrders: TorderColumnProps[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems
			.map((orderItem) => orderItem.product.name)
			.join(", "),
		totalPrice: formatter.format(
			item.orderItems.reduce((total, item) => {
				return total + Number(item.product.price);
			}, 0),
		),
		isPaid: item.isPaid,
		createdAt: format(item.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	);
}
