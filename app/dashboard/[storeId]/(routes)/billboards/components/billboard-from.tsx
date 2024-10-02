"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { billboardFormSchema, TbillboardFormData } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Billboard } from "@prisma/client";
import ImageUpload from "@/components/ui/image-upload";

export default function BillboardForm({
	initialData,
}: {
	initialData: Billboard | null;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TbillboardFormData>({
		resolver: zodResolver(billboardFormSchema),
		defaultValues: initialData || {
			label: "",
			imageUrl: [],
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit a billboard" : "Create billboard";
	const description = initialData ? "Edit a billboard" : "Add a new billboard";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData
		? "Billboard updated."
		: "Billboard created.";

	const onSubmits = async (data: TbillboardFormData) => {
		try {
			const response = await axios.patch(`/api/stores/${params.storeId}`, data);
			if (response?.data.status === 201) {
				router.refresh();
				toast.success(response?.data.message);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			toast.error("An error occurred while creating the store.");
		}
	};

	const onDelete = async () => {
		try {
			const response = await axios.delete(`/api/stores/${params.storeId}`);
			if (response?.data.status === 201) {
				router.refresh();
				router.push("/dashboard");
				toast.success("asd");
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
			toast.error("Make sure you remove all products from your store first.");
		} finally {
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				loading={isSubmitting}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
						disabled={isSubmitting}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmits)}
					className="space-y-4 w-full">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<ImageUpload
										onChange={(url) => field.onChange(url)}
										value={field.value ? [field.value] : []}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											placeholder="Billboard label"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={isSubmitting}
						type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
}
