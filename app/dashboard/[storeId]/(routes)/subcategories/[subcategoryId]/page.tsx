import prismadb from "@/lib/prisma";
import SubCategoryForm from "./components/sub-category-from";

export default async function CategoryPage({
	params,
}: {
	params: { subcategoryId: string };
}) {
	const subCategory = await prismadb.subcategory.findUnique({
		where: {
			id: params.subcategoryId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<SubCategoryForm initialData={subCategory} />
			</div>
		</div>
	);
}
