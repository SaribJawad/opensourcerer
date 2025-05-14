import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import LoginFormSection from "../_components/LoginFormSection";

export const metadata = {
  title: "Login | Opensourcerer",
  description:
    "Access your account and manage your saved open-source repositories.",
};

function page() {
  return (
    <section className="bg-background   h-dvh flex items-center justify-center p-4">
      <div className=" max-w-[420px] w-full  flex flex-col gap-10  items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent w-fit">
          <MdOutlineKeyboardArrowLeft size={20} />
          <Link href="/">Back to home</Link>
        </div>
        <Logo />
        <div className="flex flex-col items-center gap-3 justify-center text-center">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        {/* login btns & forms */}
        <LoginFormSection />
      </div>
    </section>
  );
}

export default page;
