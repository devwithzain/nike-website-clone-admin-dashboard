"use client";
import { TapiListProps } from "@/types";
import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import ApiAlert from "./api-alert";

export default function ApiList({ entityIdName, entityName }: TapiListProps) {
	const origin = useOrigin();
	const params = useParams();

	const baseUrl = `${origin}/api/${params.storeId}`;
	return (
		<>
			<ApiAlert
				title="GET"
				variant="admin"
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiAlert
				title="GET"
				variant="admin"
				description={`${baseUrl}/${entityName}{${entityIdName}}`}
			/>
			<ApiAlert
				title="POST"
				variant="admin"
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiAlert
				title="PATCH"
				variant="admin"
				description={`${baseUrl}/${entityName}{${entityIdName}}`}
			/>
			<ApiAlert
				title="DELETE"
				variant="admin"
				description={`${baseUrl}/${entityName}{${entityIdName}}`}
			/>
		</>
	);
}
