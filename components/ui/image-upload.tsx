"use client";
import {
	CldUploadWidget,
	CloudinaryUploadWidgetInfo,
	CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { TimageUploadProps } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

export default function ImageUpload({
	value = [],
	onImageUploads,
	onRemoveImage,
}: TimageUploadProps) {
	const [mediaUrls, setMediaUrls] = useState<string[]>(value);

	useEffect(() => {
		setMediaUrls(value);
	}, [value]);

	const handleMediaChange = (result: CloudinaryUploadWidgetResults) => {
		if (typeof result === "object" && "info" in result) {
			const info = result.info as CloudinaryUploadWidgetInfo;

			setMediaUrls((prevUrls) => {
				const newMediaUrls = [...prevUrls, info.secure_url];
				onImageUploads(newMediaUrls);
				return newMediaUrls;
			});
		}
	};

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{mediaUrls.map((url) => {
					const isVideo =
						url.endsWith(".mp4") ||
						url.endsWith(".webm") ||
						url.endsWith(".ogg");

					return (
						<div
							key={url}
							className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
							<div className="z-10 absolute top-2 right-2">
								<Button
									type="button"
									onClick={() => onRemoveImage(url)}
									variant="destructive"
									size="sm">
									<Trash className="h-4 w-4" />
								</Button>
							</div>

							{isVideo ? (
								<video
									controls
									className="object-cover w-full h-full">
									<source
										src={url}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							) : (
								<Image
									fill
									className="object-cover"
									alt="Media"
									src={url}
								/>
							)}
						</div>
					);
				})}
			</div>
			<CldUploadWidget
				onSuccess={handleMediaChange}
				uploadPreset="tgyt3gyu">
				{({ open }) => {
					const onClick = () => {
						open();
					};
					return (
						<Button
							type="button"
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
