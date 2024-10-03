import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TCategoryColumnProps } from "@/types";
import CategoryClient from "./components/client";

export default async function Categories({
	params,
}: {
	params: { storeId: string };
}) {
	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const formatedCategories: TCategoryColumnProps[] = categories.map(
		(billboard) => ({
			id: billboard.id,
			name: billboard.name,
			label: billboard.billboard.label,
			createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
		}),
	);
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<CategoryClient data={formatedCategories} />
			</div>
		</div>
	);
}
