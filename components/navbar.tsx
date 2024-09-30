"use client";
import { logout } from "@/action/logout";
import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<div className="border-b">
			<div className="flex items-center px-4 h-16">
				<div>this will be store swither</div>
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<Button onClick={() => logout}>LogOut</Button>
				</div>
			</div>
		</div>
	);
}
