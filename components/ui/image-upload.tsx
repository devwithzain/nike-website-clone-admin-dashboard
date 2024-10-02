"use client";
import Image from "next/image";
import { TimageUploadProps } from "@/types";
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

export default function ImageUpload({
	onChange,
	onRemove,
	value,
	disabled,
}: TimageUploadProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
						key={url}>
						<div className="z-20 absolute top-2 right-2">
							<Button
								variant="destructive"
								type="button"
								size="icon"
								onClick={() => onRemove(url)}>
								<Trash className="w-4 h-4" />
							</Button>
						</div>
						{value && (
							<Image
								fill
								className="object-cover"
								src={url}
								alt="Image"
							/>
						)}
					</div>
				))}
			</div>
			<CldUploadWidget
				onUpload={onUpload}
				uploadPreset="tgyt3gyu">
				{({ open }) => {
					const onClick = () => {
						open();
					};
					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
}
