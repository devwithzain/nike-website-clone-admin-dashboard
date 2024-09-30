import { Store } from "@prisma/client";
import { PopoverTrigger } from "@/components/ui/popover";

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

type TpopOverTriggerProps =
   React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
export interface TswitchStoreProps extends TpopOverTriggerProps {
   items: Store[];
};