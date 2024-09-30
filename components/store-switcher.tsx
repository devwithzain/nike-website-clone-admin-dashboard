"use client";
import { useState } from "react";
import { useStoreModal } from "@/hooks";
import { TswitchStoreProps } from "@/types";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

export default function StoreSwitcher({
	className,
	items = [],
}: TswitchStoreProps) {
	const router = useRouter();
	const params = useParams();
	const storeModal = useStoreModal();
	const [open, setOpen] = useState(false);

	const formatedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formatedItems.find(
		(item) => item.value === params.storeId,
	);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						"flex items-center justify-between w-[200px]",
						className,
					)}
					role="combobox"
					aria-expanded={open}
					aria-label="Select a store">
					<Store className="mr-2 h-4 w-4" />
					{currentStore?.label}
					<ChevronsUpDown className="ml-auto h-4 w-4 opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search store..." />
						<CommandEmpty>No store found.</CommandEmpty>
						<CommandGroup heading="Stores">
							{formatedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className="text-sm">
									<Store className="mr-2 h-4 w-4" />
									{store.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentStore?.value === store.value
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}>
								<PlusCircle className="mr-2 h-5 w-5" />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
