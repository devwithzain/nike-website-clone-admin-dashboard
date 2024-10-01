import prismadb from "@/lib/prisma";

export default async function DashboardPage({
	params,
}: {
	params: { storeId: string };
}) {
	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
		},
	});
	return <div>Active Store: {store?.name}</div>;
}
