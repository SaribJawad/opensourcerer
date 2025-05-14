"use client";

import Divider from "@/app/_components/Divider";
import { Button } from "@/app/_components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm";
import { signIn } from "next-auth/react";

function LoginFormSection() {
  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <div className="flex flex-col  w-full items-center gap-2 ">
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          size="lg"
          className="w-full flex items-center gap-3"
        >
          <FcGoogle />
          Continue with Google
        </Button>
        <Button
          onClick={() => signIn("github")}
          variant="outline"
          size="lg"
          className="w-full flex items-center gap-3"
        >
          <FaGithub />
          Continue with Github
        </Button>
      </div>

      <Divider>OR CONTINUE WITH EMAIL</Divider>
      <LoginForm />
    </div>
  );
}

export default LoginFormSection;
