"use client";
import { signOut } from "next-auth/react";
import React from "react";

function SignOutPage() {
  return (
    <div
      className="cursor-pointer min-h-screen items-center justify-center 
    flex w-full bg-black text-white"
    >
      <button
        onClick={() => signOut()}
        className="hover:opacity-90 smooth curspor-pointer"
      >
        signOut
      </button>
    </div>
  );
}

export default SignOutPage;
