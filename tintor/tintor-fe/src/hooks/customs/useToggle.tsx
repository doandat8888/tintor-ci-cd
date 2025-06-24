import { useState } from "react";

export const useToggle = () => {
  const [isToggle, setToggle] = useState(false);
  return { isToggle, toggle: () => setToggle((prev) => !prev) };
};
