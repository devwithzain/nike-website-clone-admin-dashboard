import { Store } from "@prisma/client";
import { PopoverTrigger } from "@/components/ui/popover";

type TpopOverTriggerProps =
   React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
export interface TswitchStoreProps extends TpopOverTriggerProps {
   items: Store[];
};

export type TmodallProps = {
   title: string;
   description: string;
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
};

export type TuseStoreModallProps = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
};

export type TheadingProps = {
   title: string;
   description: string;
};

export type TuseAlerteModalProps = {
   loading?: boolean;
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
};

export type TapiAlertProps = {
   title: string;
   description: string;
   variant: "public" | "admin";
};

export type TimageUploadProps = {
   onChange: (value: string) => void;
   onRemove: (value: string) => void;
   value: string[];
   disabled?: boolean;
};

export type TBillboardColumnProps = {
   id: string;
   label: string;
   createdAt: string;
};

export type TapiListProps = {
   entityName: string;
   entityIdName: string;
};