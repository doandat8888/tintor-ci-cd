import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmileIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  
  const schema = z.object({
    message: z.string().min(1),
  });

  const form = useForm<{ message: string }>({
    resolver: zodResolver(schema),
    defaultValues: { message: "" },
  });

  const currentMessage = form.watch("message");
  const isEnabled = (currentMessage || "").length > 0;

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            form.reset();
            sendMessage(values.message);
          })}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Type message..."
                    className="h-10 pr-24 text-xs placeholder:text-xs border-2 border-zinc-500 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 gap-1 h-7 flex items-center">
        <div className="h-1/2 w-[1.5px] bg-zinc-500 mr-2"></div>
        <Popover>
          <PopoverTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="p-1.5 rounded-full"
                  >
                    <SmileIcon className="text-zinc-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-800 text-white text-xs text-center">
                  <p>Emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverTrigger>
          <PopoverContent>
            <div className="shadow-lg w-fit rounded-xl absolute right-0 bottom-0">
              <Picker
                data={data}
                theme={"light"}
                onEmojiSelect={(emoji: any) =>
                  form.setValue("message", currentMessage + emoji.native)
                }
              />
            </div>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={form.handleSubmit((values) => {
                  form.resetField("message");
                  sendMessage(values.message);
                })}
                variant={isEnabled ? "default" : "ghost"}
                className={cn(isEnabled ? "" : "", "p-1.5 rounded-full")}
              >
                <SVGIcon
                  className={cn(
                    isEnabled ? "fill-white" : "fill-zinc-500",
                    "stroke-2"
                  )}
                  path={SVGIcon.paths.paperPlaneTilt}
                  width={16}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-white text-xs text-center">
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
