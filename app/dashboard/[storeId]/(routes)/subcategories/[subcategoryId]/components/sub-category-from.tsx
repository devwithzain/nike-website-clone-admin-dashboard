"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Category, Subcategory } from "@prisma/client";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { subCategoryFormSchema, TsubCategoryFormData } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";

export default function SubCategoryForm({
	initialData,
	category,
}: {
	initialData: Subcategory | null;
	category: Category[];
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TsubCategoryFormData>({
		resolver: zodResolver(subCategoryFormSchema),
		defaultValues: initialData || {
			name: "",
			categoryId: "",
			imageUrl: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit a sub category" : "Create sub category";
	const description = initialData
		? "Edit a sub category"
		: "Create sub category";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData
		? "Sub Category updated."
		: "Sub Category created.";

	const onSubmits = async (data: TsubCategoryFormData) => {
		try {
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/subcategories/${params.subcategoryId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/subcategories`, data);
			}
			router.push(`/dashboard/${params.storeId}/subcategories`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`/api/${params.storeId}/subcategories/${params.subcategoryId}`,
			);
			router.push(`/dashboard/${params.storeId}/subcategories`);
			router.refresh();
			toast.success("Sub Category deleted.");
		} catch (error) {
			toast.error(
				"Make sure you remove all products using this sub category first.",
			);
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
										disabled={isSubmitting}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sub Category</FormLabel>
								<FormControl>
									<Input
										placeholder="Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{category.length > 0 ? (
												category.map((cat) => (
													<SelectItem
														key={cat.id}
														value={cat.id}>
														{cat.name}
													</SelectItem>
												))
											) : (
												<SelectItem value="">No category available</SelectItem>
											)}
										</SelectContent>
									</Select>
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
