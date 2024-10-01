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
   loading: boolean;
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
};