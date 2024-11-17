"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./button/LinkButton";
import { PrimaryButton } from "./button/PrimaryButton";

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className="border-b-2 flex justify-between p-2 ">
      <div className="flex flex-col justify-center font-extrabold text-2xl">
        Zapier
      </div>
      <div className="flex justify-around gap-2">
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        <LinkButton
          onClick={() => {
            router.push("/login");
          }}
        >
          {" "}
          LogIn
        </LinkButton>
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </PrimaryButton>
      </div>
    </div>
  );
};
