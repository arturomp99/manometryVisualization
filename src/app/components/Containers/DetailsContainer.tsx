import { FC } from "react";
import { ContainerProps } from "./sharedTypes";

export const DetailsContainer: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="h-[50vh] bg-gray-800 border-2 border-gray-600 hover:border-gray-400 px-2 py-1">
      {children}
    </div>
  );
};
