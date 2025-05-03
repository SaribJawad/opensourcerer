import { User } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RegisterBody = z.object({
  name: z
    .string()
    .min(1, "Must be atleast of 4 characters")
    .max(15, "Can't be longer than 15 characters"),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, "Invalid Password"),
});

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();

  const parsedBody = RegisterBody.safeParse(body);

  if (!parsedBody.success) {
    const errors = parsedBody.error.errors.map((err) => err.message).join(" |");

    throw new Error(errors);
  }

  const { email, name, password } = parsedBody.data;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify({
        message: "An account already exists with this email.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    bookmarkedRepos: [],
    provider: "credentials",
    profileImage: "",
    bio: "",
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong while creating the user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new NextResponse(
    JSON.stringify({
      message: "User registered successfully.",
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
