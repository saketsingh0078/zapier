import { ReactNode } from "react";

export const SecondaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      className={`${
        size === "small" ? "text-sm px-4 py-2" : "text-md px-12 py-2"
      } rounded-fullcursor-pointer text-white font-bold `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
