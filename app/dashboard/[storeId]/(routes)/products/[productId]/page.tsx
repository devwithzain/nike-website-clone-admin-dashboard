import prismadb from "@/lib/prisma";
import ProductForm from "./components/product-form";

export default async function ProductPage({
	params,
}: {
	params: { productId: string; storeId: string };
}) {
	const product = await prismadb.product.findUnique({
		where: {
			id: params.productId,
		},
		include: {
			images: true,
		},
	});

	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const subcategories = await prismadb.subcategory.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const colors = await prismadb.color.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ProductForm
					subcategories={subcategories}
					categories={categories}
					colors={colors}
					sizes={sizes}
					initialData={product}
				/>
			</div>
		</div>
	);
}
