"use client";

import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function RegisterOauthButtons() {
  const handleOAuthLogin = async (provider: "github" | "google") => {
    await signIn(provider, {
      redirect: false,
      callbackUrl: window.location.href,
    });
  };

  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <Button
        onClick={() => handleOAuthLogin("google")}
        variant="outline"
        size="lg"
        className="w-full flex items-center gap-3"
      >
        <FcGoogle />
        Continue with Google
      </Button>
      <Button
        onClick={() => handleOAuthLogin("github")}
        variant="outline"
        size="lg"
        className="w-full flex items-center gap-3"
      >
        <FaGithub />
        Continue with Github
      </Button>
    </div>
  );
}

export default RegisterOauthButtons;
