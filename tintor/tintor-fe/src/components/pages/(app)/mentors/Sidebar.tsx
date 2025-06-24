import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Option } from "@/components/ui/multi-selector";
import { cn } from "@/lib/utils";
import { RotateCcw, SearchIcon } from "lucide-react";
import confuse from "@/assets/confuse.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type TMentorFilter = {
  searchText?: string;
  skill?: string;
  size: number;
  page: number;
};

export const Sidebar = ({
  handleFilterChange,
  params,
}: {
  handleFilterChange: (value: any) => void;
  params: TMentorFilter;
}) => {
  const options: Option[] = [
    { label: "Python", value: "Python" },
    { label: "Time Management", value: "Time Management" },
    { label: "Teamwork", value: "Teamwork" },
    { label: "Java", value: "Java" },
    { label: "Leadership", value: "Leadership" },
    { label: "Marketing", value: "Marketing" },
    { label: "Data Analysis", value: "Data Analysis" },
    { label: "Project Management", value: "Project Management" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "Creative Thinking", value: "Creative Thinking" },
    { label: "Public Speaking", value: "Public Speaking" },
  ];

  return (
    <div className="flex flex-col justify-between gap-2 w-[24rem] min-w-[24rem] h-[calc(100vh-3rem)] border-r border-zinc-500 p-6 sticky top-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Filter</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    handleFilterChange({
                      searchText: "",
                      skill: "",
                      page: params.page,
                      size: params.size,
                    })
                  }
                  variant={"ghost"}
                  className="aspect-square p-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-zinc-900 text-white z-[999999]"
              >
                <p>Reset filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative w-full">
          <SearchIcon className="text-zinc-500 absolute top-1/2 -translate-y-1/2 w-4 h-4 left-2.5" />
          <Input
            value={params.searchText}
            placeholder="Search by name ..."
            className="h-9 border-2 border-zinc-500 focus-visible:ring-0 pl-8"
            onChange={(e) => handleFilterChange({ searchText: e.target.value })}
          />
        </div>
        <h2 className="font-medium">Skill Categories</h2>
        <div className="flex flex-wrap gap-2 w-full">
          {options.map((item, index) => (
            <Button
              className="h-fit w-fit p-0 bg-transparent hover:bg-transparent"
              onClick={() => handleFilterChange({ skill: item.value })}
            >
              <SkillItem
                title={item.value}
                isSelected={item.value == params.skill}
                key={index}
              />
            </Button>
          ))}
        </div>
      </div>
      <div className="w-[14rem] mx-auto bg-white py-2 px-3.5 rounded-xl border-2 border-zinc-500 flex flex-col items-center gap-2">
        <img className="w-36" src={confuse} alt="confuse" />
        <span className="text-base w-full text-center font-semibold text-zinc-500">
          Difficult to contact your mentor?
        </span>
        <Button className="w-fit text-xs">Contact us</Button>
      </div>
    </div>
  );
};

const SkillItem = ({ title, isSelected }: any) => {
  return (
    <div
      className={cn(
        isSelected ? "bg-[#a39a92]" : "bg-[#beb4ab]/90",
        " hover:bg-[#a39a92] px-2.5 py-1 rounded text-sm cursor-pointer hover:-translate-y-0.5 transition-all"
      )}
    >
      {title}
    </div>
  );
};
