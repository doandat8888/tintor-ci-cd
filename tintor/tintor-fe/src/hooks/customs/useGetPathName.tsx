import { useLocation } from "react-router-dom";

export const useGetPathName = () => {
  const location = useLocation();
  return location.pathname;
};
