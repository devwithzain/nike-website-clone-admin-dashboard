import prismadb from "@/lib/prisma";
import CategoryForm from "./components/category-from";

export default async function CategoryPage({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) {
	const category = await prismadb.category.findUnique({
		where: {
			id: params.categoryId,
		},
	});

	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<CategoryForm
					billboards={billboards}
					initialData={category}
				/>
			</div>
		</div>
	);
}
