"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import { useOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modal/alert-modal";
import { settingFormSchema, TsettingFormData } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function SettingFrom({ initialData }: { initialData: Store }) {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();
	const [open, setOpen] = useState(false);

	const form = useForm<TsettingFormData>({
		resolver: zodResolver(settingFormSchema),
		defaultValues: initialData,
	});

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmits = async (data: TsettingFormData) => {
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
				toast.success(response?.data.message);
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
					title="Settings"
					description="Manage store preferences"
				/>
				<Button
					disabled={isSubmitting}
					variant="destructive"
					size="icon"
					onClick={() => setOpen(true)}>
					<Trash className="w-4 h-4" />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmits)}
					className="space-y-4 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Store name"
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
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${params.storeId}`}
				variant="admin"
			/>
		</>
	);
}
