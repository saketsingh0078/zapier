"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { InputButton } from "@/components/InputButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function () {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();
  return (
    <div>
      <div className="pb-10">
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="flex gap-20 px-20 max-w-4xl ">
          <div className="flex-1">
            <div className="text-3xl font-bold">
              Join millions worldwide who automate their work using zapier
            </div>

            <div className="pt-4 text-sm">
              <CheckFeature label="Easy setup, no coding required" />
              <CheckFeature label="Free forever for code features" />
              <CheckFeature label="14-day trail of premium features & apps" />
            </div>
          </div>

          <div className="flex-1  border h-fit px-8 py-4">
            <InputButton
              label="Work Email (required)"
              placeholder="email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputButton
              label="Password (required)"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="pt-4">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/signin`
                  );
                  localStorage.setItem("token", res.data.token);
                  router.push("/dashboard");
                }}
                size="big"
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
