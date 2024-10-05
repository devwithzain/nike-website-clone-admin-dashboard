"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

export default function MainNav({
	className,
}: React.HTMLAttributes<HTMLElement>) {
	const params = useParams();
	const pathName = usePathname();
	const routes = [
		{
			href: `/dashboard/${params.storeId}`,
			label: "Overview",
			active: pathName === `/dashboard/${params.storeId}`,
		},
		{
			href: `/dashboard/${params.storeId}/billboards`,
			label: "Billboards",
			active: pathName === `/dashboard/${params.storeId}/billboards`,
		},
		{
			href: `/dashboard/${params.storeId}/categories`,
			label: "Categories",
			active: pathName === `/dashboard/${params.storeId}/categories`,
		},
		{
			href: `/dashboard/${params.storeId}/subcategories`,
			label: "Sub Categories",
			active: pathName === `/dashboard/${params.storeId}/subcategories`,
		},
		{
			href: `/dashboard/${params.storeId}/sizes`,
			label: "Sizes",
			active: pathName === `/dashboard/${params.storeId}/sizes`,
		},
		{
			href: `/dashboard/${params.storeId}/colors`,
			label: "Colors",
			active: pathName === `/dashboard/${params.storeId}/colors`,
		},
		{
			href: `/dashboard/${params.storeId}/products`,
			label: "Products",
			active: pathName === `/dashboard/${params.storeId}/products`,
		},
		{
			href: `/dashboard/${params.storeId}/orders`,
			label: "Orders",
			active: pathName === `/dashboard/${params.storeId}/orders`,
		},
		{
			href: `/dashboard/${params.storeId}/settings`,
			label: "Settings",
			active: pathName === `/dashboard/${params.storeId}/settings`,
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
