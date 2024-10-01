"use client";
import { Button } from "./ui/button";
import { logout } from "@/action/logout";

export default function LogoutButton() {
	return (
		<Button
			size="sm"
			onClick={() => logout()}>
			LogOut
		</Button>
	);
}
