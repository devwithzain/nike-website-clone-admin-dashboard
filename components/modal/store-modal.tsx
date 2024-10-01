"use client";

import axios from "axios";
import Modal from "@/components/modal";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/user-store-modal";
import { createStoreSchema, TcreateStoreData } from "@/schemas";

export default function StoreModal() {
	const useStore = useStoreModal();

	const form = useForm<TcreateStoreData>({
		resolver: zodResolver(createStoreSchema),
		defaultValues: {
			name: "",
		},
	});

	const {
		reset,
		formState: { isSubmitting },
	} = form;

	const onSubmits = async (data: TcreateStoreData) => {
		try {
			const response = await axios.post("/api/stores", data);
			if (response?.data.status === 201) {
				window.location.assign(`/dashboard/${response.data.id}`);
			} else {
				toast.error("Failed to create store!");
			}
			reset();
		} catch (error) {
			toast.error("An error occurred while creating the store.");
		}
	};

	return (
		<Modal
			title="Create Store"
			description="Add a new store to manage products and categories"
			isOpen={useStore.isOpen}
			onClose={useStore.onClose}>
			<div className="space-y-4 pb-4 py-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmits)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="E-Commerce"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex space-x-2 justify-end items-center pt-2">
							<Button
								disabled={isSubmitting}
								onClick={useStore.onClose}
								variant="outline">
								Cancel
							</Button>
							<Button
								disabled={isSubmitting}
								type="submit">
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
}
