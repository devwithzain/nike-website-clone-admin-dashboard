import prismadb from "@/lib/prisma";
import BillboardForm from "../components/billboard-from";

export default async function BillboardPage({
	params,
}: {
	params: { billboardId: string };
}) {
	const billboard = await prismadb.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
}
