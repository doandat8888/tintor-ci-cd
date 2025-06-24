import { HeaderLogo } from "@/components/layouts/Header/HeaderLogo";
import { UserProfile } from "@/components/layouts/Header/UserProfile";
import { SVGIcon } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useGetPathName } from "@/hooks";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";
import { useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const headerMenuList = [
  { title: "Home", href: "/", isProtected: false },
  { title: "Mentors", href: "/mentors", isProtected: true },
  { title: "Chat", href: "/chat", isProtected: true },
];

export const MainHeader = () => {
  const { currentUser } = useCurrentUserStore();
  const pathname = useGetPathName();
  const controls = useAnimation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 0;
      setIsScrolled(hasScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.header
      className={cn(
        pathname == "/"
          ? isScrolled
            ? "bg-zinc-900"
            : "bg-transparent"
          : "bg-zinc-900",
        "min-h-12 z-[999999] fixed inset-x-0 top-0 overflow-hidden"
      )}
    >
      <nav className="flex w-full items-center justify-between px-6 h-12">
        <div className="flex items-center gap-6 h-full">
          <Link to="/">
            <HeaderLogo className="h-7" />
          </Link>
          <ul className="flex gap-2 items-center">
            {headerMenuList.map((item, index) => {
              return (
                (!item.isProtected || (item.isProtected && currentUser)) && (
                  <Link
                    to={item.href}
                    key={index}
                    className={cn(
                      pathname == item.href ? "text-white after:w-1/2" : "",
                      pathname == "/" && !isScrolled
                        ? "text-white"
                        : "text-gray-400",
                      "font-medium hover:text-white text-sm px-2 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 hover:after:w-1/2 after:bg-white after:transition-all"
                    )}
                  >
                    <li className="text-center">{item.title}</li>
                  </Link>
                )
              );
            })}
          </ul>
        </div>
        <div
          className={cn(currentUser ? "gap-4" : "gap-2", "flex items-center ")}
        >
          {currentUser ? (
            <>
              <SVGIcon
                path={SVGIcon.paths.bell}
                className="stroke-2 fill-white rounded-full hover:ring-8 hover:bg-zinc-400/10 hover:ring-zinc-400/10"
              />
              <UserProfile user={currentUser} />
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button
                  variant="ghost"
                  className="text-xs font-semibold text-white hover:text-white hover:bg-white/40"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="text-xs font-semibold">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
};
