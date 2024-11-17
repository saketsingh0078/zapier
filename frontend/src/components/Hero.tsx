"use client";

import { PrimaryButton } from "./button/PrimaryButton";
import { TiTick } from "react-icons/ti";
import { SecondaryButton } from "./button/SecondaryButton";
import { Feature } from "./Feature";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center">
        <div className="text-5xl font-bold text-center pt-8 max-w-xl">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-md  text-center pt-8 max-w-2xl">
          All gives you automation SuperPowers, and zapier puts to work. Pairing
          AI and zapier helps you turn ideas into workflows and bots that work
          for you.
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
          size="big"
        >
          Get started free
        </PrimaryButton>

        <SecondaryButton onClick={() => {}} size="big">
          Contact Sales
        </SecondaryButton>

        <button className="px-12 py-2 font-semibold rounded-full border-2">
          Conatct Sales
        </button>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Feature title="Free Forever" subtitle="for core features" />
        <Feature title="More apps" subtitle="than any other platform" />
        <Feature title="Cutting-edge" subtitle="Al features" />
      </div>
    </div>
  );
};
