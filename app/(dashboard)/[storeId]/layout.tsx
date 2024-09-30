import prismadb from "@/lib/prisma";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const currentuser = await currentUser();
	const userId = currentuser?.id;

	if (!userId) {
		redirect("/");
	}

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect("/");
	}

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
