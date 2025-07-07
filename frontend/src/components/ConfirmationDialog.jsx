import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Info } from "lucide-react";

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#252525] border-none rounded-3xl text-white w-[350px]">
        <AlertDialogHeader>
          <div className="flex justify-center my-3">
            <div className="bg-[#606060] rounded-full">
              <Info className="h-10 w-10 text-[#252525]" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-[#CFCFCF] text-[23px] font-medium">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-center text-gray-300 text-lg pt-2">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center sm:justify-around justify-around pt-2 px-2">
          <AlertDialogCancel
            onClick={onCancel}
            className="w-28 bg-red-600 text-white hover:bg-red-700 border-none py-2 px-4 rounded-lg text-lg font-medium"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="w-28 bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-lg text-lg font-medium"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
