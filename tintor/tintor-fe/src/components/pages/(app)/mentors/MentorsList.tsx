import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SendInvitation } from "./mentor-detail/SendInvitation";
import noData from "@/assets/no-data.svg";
import numeral from "numeral";

export const MentorsList = ({
  data,
  isMatching,
}: {
  data: any[];
  isMatching: string;
}) => {
  return data.length > 0 ? (
    <>
      {
        <div className="min-h-[calc(100vh-14.25rem)]">
          <div className="grid grid-cols-3 gap-4 p-6">
            {data.map((item, index) => (
              <MentorItem key={index} info={item} isMatching={isMatching} />
            ))}
          </div>
        </div>
      }
    </>
  ) : (
    <div className="flex flex-col justify-center items-center gap-2 h-[calc(100vh-13.75rem)]">
      <img src={noData} className="w-96" />
      <span className="-translate-y-12 font-semibold w-80 text-lg text-center">
        Not found data
      </span>
    </div>
  );
};

const MentorItem = ({
  info,
  isMatching,
}: {
  info: any;
  isMatching: string;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div
      className={cn(
        "bg-white rounded-lg hover:shadow-lg p-6 pt-56 flex flex-col gap-2 overflow-hidden relative"
      )}
    >
      <img
        src={
          info.avatar ||
          "https://res.cloudinary.com/dblglqzca/image/upload/v1734173611/tintor-images/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69_xn0kw6.jpg"
        }
        className={cn(
          "inset-x-0 h-52",
          "absolute top-0 w-full object-cover rounded-b-lg transition-all"
        )}
      />
      <div className="flex space-x-2 items-center">
        <Link className="hover:underline" to={`/mentors/${info.mentorID}`}>
          <h3 className="font-semibold text-lg">{info.name}</h3>
        </Link>
        {isMatching && (
          <div className="bg-green-400 px-4 py-0.5 rounded-lg text-sm text-white">
            {(100 * info.matchingPercent).toFixed(2)}%
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {info.skills.slice(0, 2).map((item: string, index: number) => (
          <SkillItem title={item} key={index} />
        ))}
        {info.skills.length > 2 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-sm cursor-pointer">
                  +{info.skills.length - 2} more
                </div>
              </TooltipTrigger>
              <TooltipContent className="mb-1 bg-zinc-800 text-white text-xs text-center">
                <p>
                  {info.skills.slice(2).map((title: string, index: number) => (
                    <React.Fragment key={index}>
                      <span>{title}</span>
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Separator className="mt-auto" />
      <Button
        className="border border-zinc-900 flex gap-2 w-32 translate-y-1"
        onClick={() => setIsOpenModal(true)}
      >
        <SVGIcon
          path={SVGIcon.paths.paperPlaneTilt}
          className="stroke-2 fill-white"
        />
        <span className="text-xs font-semibold">Send request</span>
      </Button>
      <SendInvitation
        isOpen={isOpenModal}
        onCloseModal={() => setIsOpenModal(false)}
      />
    </div>
  );
};

const SkillItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-sm cursor-pointer hover:-translate-y-0.5 transition-all">
      {title}
    </div>
  );
};
