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
			subcategory: true,
			productCategory: {
				include: {
					category: true,
				},
			},
			productColorImage: {
				include: {
					color: true,
				},
			},
			productSize: {
				include: {
					size: true,
				},
			},
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
		color: item.productColorImage.map((color) => color.color.name),
		size: item.productSize.map((size) => size.size.name),
		category: item.productCategory.map((category) => category.category.name),
		subcategory: item.subcategory.name,
		price: formatter.format(item.price),
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
