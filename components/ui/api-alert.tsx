"use client";

import toast from "react-hot-toast";
import { TapiAlertProps } from "@/types";
import { Copy, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ApiAlert({
	description,
	title,
	variant,
}: TapiAlertProps) {
	const textMap: Record<TapiAlertProps["variant"], string> = {
		public: "Public",
		admin: "Admin",
	};

	const varientMap: Record<TapiAlertProps["variant"], BadgeProps["variant"]> = {
		public: "secondary",
		admin: "destructive",
	};

	const onCopy = () => {
		navigator.clipboard.writeText(description);
		toast.success("API Route copied to the clipboard");
	};

	return (
		<Alert>
			<Server className="h-4 w-4" />
			<AlertTitle className="flex items-center gap-x-2">
				{title}
				<Badge variant={varientMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className="mt-4 flex items-center justify-between">
				<code className="relative rounded bg-muted px-1 py-1 font-mono text-sm font-semibold">
					{description}
				</code>
				<Button
					size="icon"
					onClick={onCopy}
					variant="outline">
					<Copy className="h-4 w-4" />
				</Button>
			</AlertDescription>
		</Alert>
	);
}
