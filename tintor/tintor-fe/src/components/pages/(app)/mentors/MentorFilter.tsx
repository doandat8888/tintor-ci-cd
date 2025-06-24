import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { User } from "@/stores";
import { useNavigate } from "react-router-dom";

type MentorFilterProps = {
  isMatching: string;
  currentUser: User;
};

export const MentorFilter = ({ isMatching }: MentorFilterProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 p-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">
            {isMatching === "true"
              ? "Mentors based on your profile"
              : "Let's find your mentor"}
          </h1>
          {!isMatching && (
            <Button
              className="border border-zinc-900 flex gap-1"
              onClick={() => navigate("/mentors?isMatching=true")}
            >
              <SVGIcon
                path={SVGIcon.paths.cards}
                className="stroke-2 fill-white"
              />
              <span className="text-xs font-semibold">Match mentor card 12122</span>
            </Button>
          )}
        </div>
        <span className="text-sm text-zinc-500">
          Start a conversation with a mentor who is available to talk right now 121212
        </span>
      </div>
      {/* <div className="flex flex-wrap gap-2 items-center">
          {currentUser.skills.map((item: string, index: number) => (
            <SkillItem key={index} title={item} />
          ))}
        </div> */}
    </div>
  );
};
