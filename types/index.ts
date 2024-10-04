import { PopoverTrigger } from "@/components/ui/popover";
import { Category, Color, Image, Product, Size, Store } from "@prisma/client";

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

export type TCategoryColumnProps = {
   id: string;
   name: string;
   label: string;
   createdAt: string;
};

export type TapiListProps = {
   entityName: string;
   entityIdName: string;
};

export type TcolorColumnProps = {
   id: string;
   name: string;
   value: string;
   createdAt: string;
};

export type TsizeColumnProps = {
   id: string;
   name: string;
   value: string;
   createdAt: string;
};

export type TproductColumnProps = {
   id: string;
   name: string;
   price: string;
   category: string;
   size: string;
   color: string;
   createdAt: string;
   isFeatured: boolean;
   isArchived: boolean;
};

export type TproductFormProps = {
   initialData:
   | (Product & {
      images: Image[];
   })
   | null;
   categories: Category[];
   colors: Color[];
   sizes: Size[];
};

export type TgraphData = {
   name: string;
   total: number;
};

export type TorderColumnProps = {
   id: string;
   phone: string;
   address: string;
   isPaid: boolean;
   totalPrice: string;
   products: string;
   createdAt: string;
};
