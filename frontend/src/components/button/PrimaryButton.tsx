"use client";

import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = " small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | " small";
}) => {
  return (
    <div
      className={`${
        size === " small" ? "text-sm px-4 py-2" : "text-md px-12 py-2"
      } bg-orange-600 rounded-full hover:bg-orange-500 cursor-pointer text-center text-white font-bold hover:shadow-md`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
