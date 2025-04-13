import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-5 bg-[#232f3e] text-gray-300 ">
      <div className="container">
        <div className="row flex items-center justify-center gap-4">
          <Link href={"/"}>
            <Image
              src={"/logo (1).png"}
              width={110}
              height={30}
              alt="logoImage"
            />
          </Link>
          <p className="text-sm mb-3">All rights reserved @AhmedMohamed</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
