import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";

export const UserFilter = (props: {
  text: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center gap-2 top-0 sticky bg-[#e4dbd3] z-[10] pb-2">
      <div className="relative w-full">
        <SearchIcon className="text-zinc-500 absolute top-1/2 -translate-y-1/2 w-4 h-4 left-2.5" />
        <Input
          value={props.text}
          placeholder="Search user's name..."
          className="h-9 border-2 border-zinc-500 focus-visible:ring-0 pl-8 "
          onChange={(e) => props.setSearchText(e.target.value)}
        />
        {props.text.length > 0 && (
          <Button
            variant={"ghost"}
            onClick={() => props.setSearchText("")}
            className=" absolute top-1/2 -translate-y-1/2 right-2.5 w-fit h-fit p-1 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
