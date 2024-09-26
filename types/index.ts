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