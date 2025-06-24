import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const SendInvitation = ({ isOpen, onCloseModal }: { isOpen: boolean, onCloseModal: () => void }) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) return;
        onCloseModal();
      }}
    >
      <DialogContent className="w-1/2" onClick={(e) => e.stopPropagation()}>
        <DialogHeader className="gap-2">
          <DialogTitle className="font-semibold">
            <p>Please leave a note here</p>
          </DialogTitle>
          <Separator className="bg-zinc-500" />
          <DialogDescription>
            <Textarea />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="items-center gap-2 mt-2">
          <span
            onClick={() => {
              onCloseModal();
            }}
            className="text-sm text-zinc-500 underline underline-offset-2 p-1 cursor-pointer"
          >
            Cancel
          </span>
          <Button
            type="submit"
            onClick={() => {
              toast.success("Request sent successfully.");
              onCloseModal();
              navigate('/chat');
            }}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
