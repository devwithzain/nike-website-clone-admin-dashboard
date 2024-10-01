import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";
import SettingFrom from "./components/setting-from";

export default async function Settings({
	params,
}: {
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
		},
	});

	if (!store) {
		redirect("/dashboard");
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<SettingFrom initialData={store} />
			</div>
		</div>
	);
}
