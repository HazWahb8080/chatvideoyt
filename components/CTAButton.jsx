import { useRouter } from "next/navigation";
import React from "react";

function CTAButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/plans")}
      className="px-4 py-2 bg-black text-white text-md rounded-full"
    >
      get started
    </button>
  );
}

export default CTAButton;
