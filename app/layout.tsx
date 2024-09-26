import "@/styles/globals.css";
import type { Metadata } from "next";
import { ToastProvider, ModalProvider } from "@/providers";

export const metadata: Metadata = {
	title: "Nike Website Clone Admin Dashboard",
	description: "Nike Website Clone Admin Dashboard by devwithzain",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ToastProvider />
				<ModalProvider />
				{children}
			</body>
		</html>
	);
}
