import { TheadingProps } from "@/types";

export default function Heading({ description, title }: TheadingProps) {
	return (
		<div>
			<h1 className="text-3xl tracking-tighter from-black">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
