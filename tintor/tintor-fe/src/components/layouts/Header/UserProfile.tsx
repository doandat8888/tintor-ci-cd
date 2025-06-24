import image from "@/assets/avt.jpg";
import { SVGIcon } from "@/components/ui";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCurrentUserStore, User } from "@/stores";
import Cookies from "js-cookie";

export const UserProfile = ({ user }: { user: User }) => {
  const { signOut } = useCurrentUserStore();

  const handleSignOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    signOut();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="border-2 hover:ring-8 ring-zinc-400/10">
          <AvatarImage src={image} alt="User Avatar" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="flex w-64 flex-col gap-1 p-2"
      >
        <div className="flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold hover:bg-gray-200">
          <SVGIcon
            path={SVGIcon.paths.userCard}
            className="stroke-2 -translate-y-[1px]"
          />
          <span>{user.fullName}</span>
        </div>

        <div className="flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold hover:bg-gray-200">
          <SVGIcon path={SVGIcon.paths.password} className="stroke-2" />
          <span>Change Password</span>
        </div>

        <div className="px-2">
          <Separator />
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold hover:bg-gray-200"
          onClick={handleSignOut}
        >
          <SVGIcon path={SVGIcon.paths.signOut} className="stroke-2" />
          <span>Sign out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
