"use client";

import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { colorFormSchema, TcolorFormData } from "@/schemas";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function ColorForm({
	initialData,
}: {
	initialData: Color | null;
}) {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Edit color" : "Create color";
	const description = initialData ? "Edit a color." : "Add a new color";
	const toastMessage = initialData ? "Color updated." : "Color created.";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<TcolorFormData>({
		resolver: zodResolver(colorFormSchema),
		defaultValues: initialData || {
			name: "",
		},
	});

	const onSubmit = async (data: TcolorFormData) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/colors/${params.colorId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/colors`, data);
			}
			router.refresh();
			router.push(`/dashboard/${params.storeId}/colors`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			router.refresh();
			router.push(`/dashboard/${params.storeId}/colors`);
			toast.success("Color deleted.");
		} catch (error) {
			toast.error("Make sure you removed all products using this color first.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
						disabled={loading}
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
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full">
					<div className="md:grid md:grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Color name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<div className="flex items-center gap-x-4">
											<Input
												disabled={loading}
												placeholder="Color value"
												{...field}
											/>
											<div
												className="border p-4 rounded-full"
												style={{ backgroundColor: field.value }}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className="ml-auto"
						type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
}
