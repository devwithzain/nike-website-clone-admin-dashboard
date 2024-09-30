import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

export default function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const params = useParams();
	const pathName = usePathname();
	const routes = [
		{
			href: `/${params.storeId}/settings`,
			label: "Settings",
			active: pathName === `/${params.storeId}/settings`,
		},
	];
	return (
		<nav className={cn("flex items-center space-x-4", className)}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						"text-sm font-medium transition-colors hover:text-primary",
						route.active
							? "text-black dark:text-white"
							: "text-muted-foreground",
					)}>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
