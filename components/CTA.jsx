import React from "react";
import CTAButton from "./CTAButton";

function CTA() {
  return (
    <div className=" min-h-[70vh] w-full py-12 px-6 items-center justify-center flex flex-col space-y-6">
      <h2 className="text-4xl font-medium">Get started today</h2>
      <p className="w-1/2 text-center">
        It’s time to take control of your books. Buy our software so you can
        feel like you’re doing something productive.
      </p>
      <CTAButton />
    </div>
  );
}

export default CTA;
