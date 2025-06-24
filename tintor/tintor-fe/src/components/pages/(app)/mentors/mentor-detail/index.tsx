import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import mentors from "@/data/mentors.json";
import { ChartNoAxesCombinedIcon, ClockIcon, Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SendInvitation } from "./SendInvitation";
import bg from "@/assets/bg.jpg";

export const MentorDetailPage = () => {
  const { id } = useParams();
  const mentor = mentors.find((item) => item.mentorID == id);
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (!mentor) {
    return <></>;
  }

  return (
    <div>
      <div className="w-full h-60 relative">
        <img src={bg} className="h-full w-full object-cover" />
        <img
          src={
            mentor.avatar ||
            "https://res.cloudinary.com/dblglqzca/image/upload/v1734173611/tintor-images/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69_xn0kw6.jpg"
          }
          className=" absolute -bottom-[4rem] left-[4.5rem] w-40 aspect-square rounded-full object-cover"
        />
      </div>
      <div className="py-6 px-24 h-full flex flex-col gap-4 mt-16">
        <div className="flex flex-col gap-2">
          <div className="flex gap-10 items-start">
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl uppercase font-bold text-my-blue">
                  {mentor?.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Email
                    <span className="text-zinc-500 ml-6">{mentor?.email}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <ClockIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Availability:{" "}
                    <span className="text-zinc-500 ml-6">
                      {mentor?.availability}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartNoAxesCombinedIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Good at:</span>
                  <div className="ml-10 flex flex-wrap gap-2 items-center">
                    {mentor.skills
                      .slice(0, 4)
                      .map((item: string, index: number) => (
                        <SkillItem title={item} key={index} />
                      ))}
                    {mentor.skills.length > 4 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-xs cursor-pointer">
                              +{mentor.skills.length - 4} more
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="mb-1 bg-zinc-800 text-white text-xs text-center">
                            <p>
                              {mentor.skills
                                .slice(4)
                                .map((title: string, index: number) => (
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
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Phonenumber
                    <span className="text-zinc-500 ml-6">
                      {mentor?.phoneNumber}
                    </span>
                  </span>
                </div>
              </div>
              <Button
                className="border border-zinc-900 flex gap-2 w-40 mt-2"
                onClick={() => setIsOpenModal(true)}
              >
                <SVGIcon
                  path={SVGIcon.paths.paperPlaneTilt}
                  className="stroke-2 fill-white"
                />
                <span className="text-xs font-semibold">Send request</span>
              </Button>
            </div>
          </div>
        </div>
        <Separator className="bg-zinc-500" />
        <div className="flex gap-2">
          <div className="about">
            <h3 className="text-2xl font-semibold uppercase text-my-blue">
              About me
            </h3>
            <p>
              Sound recording and music technology, audio and synthesizers.
              Djing and record collecting (I'm mostly interested in techno and
              electro music). I'm also a big premier league fan, my team is West
              Ham United. I have a daughter aged 6 and 4 cats. I'm definitely a
              cat person! Recently I moved back to the UK for a while. I plan to
              return to Japan in February or March next year. Thanks to everyone
              who reached out to me. Your kindness is appreciated!
            </p>
          </div>
        </div>
        <img src="https://fastdo.vn/wp-content/uploads/2021/12/mentoring-la-gi-1-min.jpg"></img>
      </div>
      <SendInvitation
        isOpen={isOpenModal}
        onCloseModal={() => setIsOpenModal(false)}
      />
    </div>
  );
};

const SkillItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#beb4ab] px-2.5 py-1 text-nowrap rounded text-xs cursor-pointer hover:-translate-y-0.5 transition-all">
      {title}
    </div>
  );
};
