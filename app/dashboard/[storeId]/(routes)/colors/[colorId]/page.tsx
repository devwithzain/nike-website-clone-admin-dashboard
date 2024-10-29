import prismadb from "@/lib/prisma";
import ColorForm from "./components/color-form";

export default async function ColorPage({
	params,
}: {
	params: { colorId: string };
}) {
	const color = await prismadb.color.findUnique({
		where: {
			id: params.colorId,
		},
		include: {
			images: true,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<ColorForm initialData={color} />
			</div>
		</div>
	);
}
