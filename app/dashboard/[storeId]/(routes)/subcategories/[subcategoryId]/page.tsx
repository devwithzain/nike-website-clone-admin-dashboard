import prismadb from "@/lib/prisma";
import SubCategoryForm from "./components/sub-category-from";

export default async function SubCategoryPage({
	params,
}: {
	params: { subcategoryId: string; storeId: string };
}) {
	const subCategory = await prismadb.subcategory.findUnique({
		where: {
			id: params.subcategoryId,
		},
	});

	const category = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<SubCategoryForm
					initialData={subCategory}
					category={category}
				/>
			</div>
		</div>
	);
}
