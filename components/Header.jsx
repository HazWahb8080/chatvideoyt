import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="w-full grid grid-cols-2 p-4">
      {/* left */}
      <div
        className="w-full flex items-center justify-start space-x-4 col-span-1
       lg:space-x-6"
      >
        {/* logo */}
        <p className="text-lg font-bold text-black/70 italic">ChatVideo</p>
        {/* navlinks */}
        <div className="flex space-x-3">
          <Link className="navLink" href="#Features">
            Features
          </Link>
          <Link className="navLink" href="#Testimonials">
            Testimonials
          </Link>
          <Link className="navLink" href="#Pricing">
            Pricing
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="w-full space-x-4 flex items-center justify-end col-span-1">
        <Link className="navLink" href="/Pricing">
          signIn
        </Link>
        <button className="rounded-3xl bg-[#2563EB] text-white px-4 py-2.5 text-sm hover:opacity-85">
          {" "}
          get started today
        </button>
      </div>
      {/* links/buttons */}
    </div>
  );
}

export default Header;
