"use client";
import { signIn } from "next-auth/react";
import React from "react";
function SignInPage() {
  return <div onClick={() => signIn("google")}>signIn</div>;
}

export default SignInPage;
