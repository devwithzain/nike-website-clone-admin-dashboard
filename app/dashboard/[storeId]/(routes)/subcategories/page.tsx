import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TsubCategoryColumnProps } from "@/types";
import SubCategoryClient from "./components/client";

export default async function SubCategories({
	params,
}: {
	params: { storeId: string };
}) {
	const subCategories = await prismadb.subcategory.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formatedSubCategories: TsubCategoryColumnProps[] = subCategories.map(
		(billboard) => ({
			id: billboard.id,
			name: billboard.name,
			label: billboard.category.name,
			category: billboard.category.name,
			createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
		}),
	);
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SubCategoryClient data={formatedSubCategories} />
			</div>
		</div>
	);
}
