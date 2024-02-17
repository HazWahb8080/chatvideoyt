import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: "12423760",
  providers: [
    GoogleProvider({
      clientId:
        "519895359716-gvrtdjk64rdhoifubfhqrsp92nfkk4pk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
