import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const LeaveChatRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [starsPoint, setStarsPoint] = useState(0);
  const [hoverPoint, setHoverPoint] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="text-xs">
            Complete Session
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsOpen(false);
                setIsOpenDialog(true);
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={isOpenDialog}
        onOpenChange={(open) => {
          if (!open) return;
          setIsOpenDialog(open);
        }}
      >
        <DialogContent className="w-1/2" onClick={(e) => e.stopPropagation()}>
          <DialogHeader className="gap-2">
            <DialogTitle className="font-semibold">
              Thank you for spending time with mentor!!
            </DialogTitle>
            <Separator className="bg-zinc-500" />
            <DialogDescription>
              How do you feel about the quality of this conversation, please
              leave the rating 121212.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex justify-center items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  onClick={() => {
                    setStarsPoint(index + 1);
                    setHoverPoint(index + 1);
                  }}
                  onMouseEnter={() => setHoverPoint(index + 1)}
                  onMouseLeave={() => setHoverPoint(starsPoint)}
                  className={cn(
                    hoverPoint >= index + 1
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "",
                    "w-4.5 h-4.5 hover:fill-yellow-400 hover:scale-125 cursor-pointer transition-all"
                  )}
                />
              ))}
            </div>
            <StarBadge starsPoint={starsPoint} />
            <Label className="text-sm">Feedback (if any)</Label>
            <Textarea
              rows={3}
              className="text-xs placeholder:text-xs"
              placeholder="Leave your feedback..."
            />
          </div>
          <DialogFooter className="items-center gap-2 mt-2">
            <span
              onClick={() => {
                toast.success("Thank for your feedback.");
                navigate("/");
                setIsOpenDialog(false);
              }}
              className="text-sm text-zinc-500 underline underline-offset-2 p-1 cursor-pointer"
            >
              Skip
            </span>
            <Button
              type="submit"
              onClick={() => {
                toast.success("Thank for your feedback.");
                navigate("/");
                setIsOpenDialog(false);
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const StarBadge = (props: { starsPoint: number }) => {
  let contents = [
    undefined,
    {
      className: "bg-red-500/90",
      text: "Bad",
    },
    {
      className: "bg-orange-500/80",
      text: "Not good",
    },
    {
      className: "bg-my-blue/50",
      text: "OK",
    },
    {
      className: "bg-lime-500",
      text: "Good",
    },
    {
      className: "bg-green-700",
      text: "Excellent",
    },
  ];

  const currentStar = contents[props.starsPoint];

  return (
    currentStar && (
      <span
        className={cn(
          currentStar.className,
          "mx-auto mt-1 font-semibold text-xs px-4 py-1.5 rounded text-white"
        )}
      >
        {currentStar.text}
      </span>
    )
  );
};
