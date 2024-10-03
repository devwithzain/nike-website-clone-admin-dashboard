"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Billboard, Category } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { categoryFormSchema, TcategoryFormData } from "@/schemas";
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
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from "@/components/ui/select";

export default function CategoryForm({
	initialData,
	billboards,
}: {
	initialData: Category | null;
	billboards: Billboard[];
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TcategoryFormData>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: initialData || {
			name: "",
			billboardId: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit a category" : "Create category";
	const description = initialData ? "Edit a category" : "Add a new category";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData ? "Category updated." : "Category created.";

	const onSubmits = async (data: TcategoryFormData) => {
		try {
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/categories/${params.categoryId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/categories`, data);
			}
			router.push(`/dashboard/${params.storeId}/categories`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`/api/${params.storeId}/categories/${params.categoryId}`,
			);
			router.push(`/dashboard/${params.storeId}/categories`);
			router.refresh();
			toast.success("Category deleted.");
		} catch (error) {
			toast.error(
				"Make sure you remove all products using this category first.",
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
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Category name"
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
							name="billboardId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a billboard"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{billboards.length > 0 ? (
												billboards.map((billboard) => (
													<SelectItem
														key={billboard.id}
														value={billboard.id}>
														{billboard.label}
													</SelectItem>
												))
											) : (
												<SelectItem value="">
													No billboards available
												</SelectItem>
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
