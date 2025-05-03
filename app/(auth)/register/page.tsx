import Divider from "@/app/_components/Divider";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import RegisterForm from "./_components/RegisterForm";
import RegisterOauthButtons from "./_components/RegisterOauthButtons";

function page() {
  return (
    <section className="bg-background   h-dvh flex items-center justify-center p-4">
      <div className=" max-w-[420px] w-full  flex flex-col gap-10 items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent w-fit">
          <MdOutlineKeyboardArrowLeft size={20} />
          <Link href="/">Back to home</Link>
        </div>
        <Logo />
        <div className="flex flex-col items-center gap-3 justify-center text-center">
          <h1 className="text-3xl font-semibold">Create an account</h1>
          <p className="text-muted-foreground">
            Sign up to start finding open source projects
          </p>
        </div>
        {/* login btns & forms */}
        <div className="flex flex-col gap-5 items-center w-full">
          <RegisterOauthButtons />

          <Divider>OR CONTINUE WITH EMAIL</Divider>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

export default page;
