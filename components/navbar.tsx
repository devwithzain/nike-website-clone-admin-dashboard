import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";
import MainNav from "@/components/main-nav";
import { currentUser } from "@/lib/current-user";
import LogoutButton from "@/components/logout-button";
import StoreSwitcher from "@/components/store-switcher";

export default async function Navbar() {
	const currentuser = await currentUser();
	const userId = currentuser?.id;
	if (!userId) {
		redirect("/");
	}

	const stores = await prismadb.store.findMany({
		where: {
			userId,
		},
	});

	return (
		<div className="border-b">
			<div className="flex items-center px-4 h-16">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<LogoutButton />
				</div>
			</div>
		</div>
	);
}
