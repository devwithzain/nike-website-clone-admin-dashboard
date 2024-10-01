import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentuser = await currentUser();
	const userId = currentuser?.id;

	if (!userId) {
		redirect("/");
	}

	const store = await prismadb.store.findFirst({
		where: {
			userId,
		},
	});

	if (store) {
		redirect(`/dashboard/${store.id}`);
	}

	return <>{children}</>;
}
