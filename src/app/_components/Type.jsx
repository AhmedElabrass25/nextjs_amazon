import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";

const Type = () => {
  const data = useSession();
  return (
    <section className="bg-[#232f3e] text-white py-2">
      <div className="container">
        <div className="row flex items-center justify-start gap-2">
          <Link
            href={"/"}
            className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
          >
            <span>All</span>
            <FaBars />
          </Link>
          <div className="md:flex items-center justify-start gap-2 hidden">
            <Link
              href={"/"}
              className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
            >
              Todays Deals
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
            >
              Customer Service
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
            >
              Registry
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
            >
              Gift Cards
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-1 p-1 border-transparent border hover:border-white transition-border duration-300"
            >
              Sell
            </Link>
          </div>
          {data?.status !== "unauthenticated" && (
            <p
              onClick={() => signOut("google")}
              className="text-[14px] text-red-600 lg:text-lg font-medium flex items-center cursor-pointer"
            >
              signOut
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Type;
