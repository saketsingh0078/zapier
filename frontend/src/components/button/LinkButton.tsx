"use client";

import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="px-4 py-2 font-thin hover:bg-gray-300 rounded-md cursor-pointer "
      onClick={onClick}
    >
      {children}
    </div>
  );
};
