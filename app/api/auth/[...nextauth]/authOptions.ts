import connection from "@/db/connection";
import userModel, { Users } from "@/db/models/user.model";
import { compare } from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "username and password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        await connection();

        const user: Users | null = await userModel.findOne({
          username: credentials.username,
        });

        if (!user) return null;

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        return passwordMatch ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        interface UserTokenData extends User {
          firstName?: string;
          lastName?: string;
          roles?: string[];
          _id?: string;
        }

        const userdata: UserTokenData = user;

        token.user = {
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          roles: userdata.roles,
          _id: userdata.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
