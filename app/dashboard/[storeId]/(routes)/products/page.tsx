import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { formatter } from "@/lib/utils";
import { TproductColumnProps } from "@/types";
import ProductsClient from "./components/client";

export default async function ProductsPage({
	params,
}: {
	params: { storeId: string };
}) {
	const products = await prismadb.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			size: true,
			color: true,
			subcategory: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formattedProducts: TproductColumnProps[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured,
		isArchived: item.isArchived,
		price: formatter.format(item.price),
		category: item.category.name,
		subcategory: item.subcategory.name,
		size: item.size.name,
		color: item.color.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductsClient data={formattedProducts} />
			</div>
		</div>
	);
}
