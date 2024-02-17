import React from "react";
import CTAButton from "./CTAButton";
import { signIn, useSession } from "next-auth/react";
import { pay } from "@/app/actions/actions";
import { usePlan } from "@/hooks/usePlan";
import { useRouter } from "next/navigation";

function Pricing({ plansPage }) {
  const { data: session } = useSession();
  const { active, customerPortal } = usePlan();
  const router = useRouter();
  return (
    <div
      id="Pricing"
      className="min-h-screen w-full items-center justify-start flex flex-col bg-black pt-20 pb-12 px-6"
    >
      <h2 className="text-3xl text-white font-medium text-center">
        Simple pricing, for everyone.
      </h2>
      <p className="w-1/2 text-center mt-4 text-white">
        It doesn’t matter what size your business is, our software won’t work
        well for you.
      </p>
      <div className="w-full items-center justify-center flex py-20">
        <div
          className="rounded-xl min-h-[400px] bg-white min-w-[25%] shadow-white/10 shadow-xl
         text-black py-4 px-4 items-start justify-start flex flex-col relative"
        >
          <span className="w-full flex items-center justify-between">
            <h2 className="text-black font-medium text-4xl py-4">$9.99</h2>
            {plansPage ? (
              <button
                onClick={() =>
                  session
                    ? active
                      ? router.replace(customerPortal)
                      : pay(session)
                    : signIn("google")
                }
              >
                {session
                  ? active
                    ? "handle plan"
                    : "subscribe"
                  : "signIn first"}
              </button>
            ) : (
              <CTAButton />
            )}
          </span>
          <span className="w-full h-[0.5px] bg-black/20 mb-8" />
          <h2 className="text-xl font-medium">Simple Plan</h2>
          <p className="text-sm">get instant access to the extension.</p>
          <span className="space-y-4 mt-6 ">
            <p className="text-sm text-black/80">
              ✓ summarize any youtube video
            </p>{" "}
            <p className="text-sm text-black/80">
              ✓ chat with any youtube video using AI.
            </p>{" "}
            <p className="text-sm text-black/80">
              ✓ handle your own api key for better tracking
            </p>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
