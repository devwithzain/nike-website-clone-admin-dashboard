"use client";
import Select from "react-select";
import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { TproductFormProps } from "@/types";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/image-upload";
import AlertModal from "@/components/modal/alert-modal";
import { productFormSchema, TproductFormData } from "@/schemas";
import {
	Select as Selected,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function ProductForm({
	initialData,
	categories,
	subcategories,
	colors,
	sizes,
}: TproductFormProps) {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Edit product" : "Create product";
	const description = initialData ? "Edit a product." : "Add a new product";
	const toastMessage = initialData ? "Product updated." : "Product created.";
	const action = initialData ? "Save changes" : "Create";

	const defaultValues = initialData
		? {
				...initialData,
				price: parseFloat(String(initialData?.price)),
		  }
		: {
				name: "",
				images: [],
				productSize: [],
				productColor: [],
				price: 0,
				categoryId: "",
				subcategoryId: "",
				isFeatured: false,
				isArchived: false,
		  };

	const form = useForm<TproductFormData>({
		resolver: zodResolver(productFormSchema),
		defaultValues,
	});

	const onSubmit = async (data: TproductFormData) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/products/${params.productId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/products`, data);
			}
			router.refresh();
			router.push(`/dashboard/${params.storeId}/products`);
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
			await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			router.refresh();
			router.push(`/dashboard/${params.storeId}/products`);
			toast.success("Product deleted.");
		} catch (error) {
			toast.error("Something went wrong.");
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
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((image) => image.url)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="9.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Selected
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Selected>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="subcategoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sub Category</FormLabel>
									<Selected
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a sub category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{subcategories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Selected>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="productSize"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Size</FormLabel>
									<FormControl>
										<Select
											isMulti
											options={sizes.map((size) => ({
												value: size.id,
												label: size.name,
											}))}
											isDisabled={loading}
											onChange={(selected) =>
												field.onChange(selected.map((item) => item.value))
											}
											value={sizes
												.filter((size) => field.value.includes(size.id))
												.map((size) => ({ value: size.id, label: size.name }))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="productColor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Colors</FormLabel>
									<FormControl>
										<Select
											isMulti
											options={colors.map((color) => ({
												value: color.id,
												label: color.name,
											}))}
											isDisabled={loading}
											onChange={(selected) =>
												field.onChange(selected.map((item) => item.value))
											}
											className="rounded-[20px]"
											value={colors
												.filter((color) => field.value.includes(color.id))
												.map((color) => ({
													value: color.id,
													label: color.name,
												}))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Featured</FormLabel>
										<FormDescription>
											This product will appear on the home page
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isArchived"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Archived</FormLabel>
										<FormDescription>
											This product will not appear anywhere in the store.
										</FormDescription>
									</div>
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
