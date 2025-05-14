import { User } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error(
              "User not found. Please check the email and try again."
            );
          }

          const isValid = await user.isPasswordCorrect(credentials.password);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
          };
        } catch (error) {
          console.log("Error while logging in", error);
          throw error;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      connectDB();
      const existingUser = await User.findOne({ email: profile?.email });

      if (
        existingUser &&
        account?.provider !== "credentials" &&
        existingUser.provider === "credentials"
      ) {
        throw new Error("AccountExistsWithCredentials");
      }

      if (account?.provider === "google") {
        if (!existingUser) {
          try {
            const date = new Date();
            const month = date.toLocaleString("default", {
              month: "long",
            });
            const joinedOn = `${month} / ${date.getFullYear()}`;

            await User.create({
              name: profile?.name,
              email: profile?.email,
              profileImage: (profile as GoogleProfile).picture,
              joinedOn,
              provider: "google",
              bookmarkedRepo: [],
            });
          } catch (error) {
            console.log("error while signing user with google", error);
            throw new Error(
              "Something went wrong while creating User with google."
            );
          }
        }
      }

      if (account?.provider === "github") {
        if (!existingUser) {
          try {
            const date = new Date();
            const month = date.toLocaleString("default", {
              month: "long",
            });
            const joinedOn = `${month} / ${date.getFullYear()}`;

            const githubProfile = profile as { bio: string };

            await User.create({
              name: user.name,
              email: user.email,
              profileImage: user.image,
              joinedOn,
              bookmarkedRepo: [],
              provider: "github",
              bio: githubProfile.bio,
            });
          } catch (error) {
            console.log("error while signing user with github", error);
            throw new Error(
              "Something went wrong while creating User with github."
            );
          }
        }
      }

      return true;
    },
    // account, profile,

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
