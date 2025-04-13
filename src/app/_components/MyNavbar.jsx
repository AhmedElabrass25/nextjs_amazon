"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Type from "./Type";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const data = useSession();
  const { products } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products?.allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products?.allProducts]);
  return (
    <section className="w-full sticky left-0 right-0 top-0 bg-[#131921] z-[999]">
      <div className="container">
        <div className="row w-full flex flex-col lg:flex-row items-center justify-between gap-4 py-2">
          {/* =========Navbar Contents======== */}
          <div className="w-full flex items-center justify-between">
            {/* =====Left Side=========== */}
            <div className="leftSide mr-3">
              <Link href={"/"}>
                <Image
                  src={"/logo (1).png"}
                  width={110}
                  height={30}
                  alt="logoImage"
                  className="w-24 md:w-28 "
                />
              </Link>
            </div>
            {/* ======== Search Bar ===========  */}
            <div className="relative search w-full text-center lg:w-[500px] hidden lg:block">
              <div className="relative">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type="text"
                  className="w-full px-4 py-2 outline-none rounded-lg"
                  placeholder="search amazon products....."
                />
                <span className="p-2 absolute right-0 bg-[#febd69] rounded-r-lg">
                  <BiSearchAlt className="text-2xl text-black" />
                </span>
              </div>
              {/* ===========Search Results=========== */}
              {searchTerm && (
                <div className="absolute w-full rounded-lg mt-2 right-0 p-5 bg-[#e5e7eb] h-[400px] overflow-y-auto">
                  {filteredProducts?.length > 0 ? (
                    filteredProducts.map((pro) => {
                      return (
                        <Link
                          href={`/${pro?._id}`}
                          onClick={() => setSearchTerm("")}
                          key={pro?._id}
                        >
                          <div className="flex items-center justify-between p-3 border-b border-slate-300 hover:bg-slate-400/30">
                            {/* image */}
                            <div className="image">
                              <Image
                                src={pro?.image}
                                width={60}
                                height={60}
                                alt="searchImage"
                                className=""
                              />
                            </div>
                            {/* details */}
                            <div>
                              <p className="text-lg font-medium">
                                {pro?.title}
                              </p>
                              <p>$ {pro?.price}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p>
                      Nothing is matches with your search keywords. Please try
                      again
                    </p>
                  )}
                </div>
              )}{" "}
            </div>
            {/* =====Right Side=========== */}
            <div className="rightSide flex items-center gap-1 lg:gap-6">
              <div className="login p-1 border-transparent border hover:border-white transition-all duration-300">
                {data?.status === "authenticated" ? (
                  <div className="flex items-center gap-1">
                    {data?.data?.user?.image && (
                      <Image
                        src={data?.data?.user?.image}
                        width={30}
                        height={30}
                        alt="userImage"
                        className="rounded-full"
                      />
                    )}
                    <p className="text-white text-[11px] md:text-[16px]">
                      Hello , {data?.data?.user?.name}
                    </p>
                  </div>
                ) : (
                  <p
                    onClick={() => signIn("google")}
                    className="text-[14px] text-white lg:text-lg font-semibold flex items-center cursor-pointer"
                  >
                    Hello, sign in
                    <IoMdArrowDropdown />
                  </p>
                )}
              </div>
              <div className="favorite p-1 border-transparent border hover:border-white transition-all duration-300">
                <Link href="/favorite" className="relative inline-block">
                  <FaRegHeart className="text-4xl md:text-[44px] text-white" />
                  <span className="absolute top-1/2 left-1/2 font-medium transform -translate-x-1/2 -translate-y-1/2 text-lg text-[#f9be70] rounded-full px-1.5">
                    {products?.favoriteProducts?.length || 0}
                  </span>
                </Link>
              </div>
              <div className="cart p-1 border-transparent border hover:border-white transition-all duration-300">
                <Link href={"/cart"} className="relative inline-block">
                  <Image
                    src={"/cartIcon.png"}
                    width={60}
                    height={50}
                    alt="cartImage"
                    className="w-12 md:w-12"
                  />
                  <span className="absolute top-1/3 left-[55%]  font-medium transform -translate-x-1/2 -translate-y-1/2 text-lg text-[#f9be70] rounded-full px-1.5">
                    {products?.cart?.length || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* ======== Search Bar in mobile=======  */}
          <div className="search w-full text-center block lg:hidden lg:w-[400px] relative">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="w-full px-4 py-2 outline-none rounded-lg"
                placeholder="search amazon products....."
              />
              <span className="p-2 absolute right-0 bg-[#febd69] rounded-r-lg">
                <BiSearchAlt className="text-2xl text-black" />
              </span>
            </div>
            {/* ===========Search Results=========== */}
            {searchTerm && (
              <div className="absolute w-full rounded-lg mt-2 right-0 p-5 bg-[#e5e7eb] h-[400px] overflow-y-auto">
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((pro) => {
                    return (
                      <Link
                        href={`/${pro?._id}`}
                        onClick={() => setSearchTerm("")}
                        key={pro?._id}
                      >
                        <div className="flex items-center justify-between p-3 border-b border-slate-300 hover:bg-slate-400/30">
                          {/* image */}
                          <div className="image">
                            <Image
                              src={pro?.image}
                              width={60}
                              height={60}
                              alt="searchImage"
                              className=""
                            />
                          </div>
                          {/* details */}
                          <div>
                            <p className="text-lg font-medium">{pro?.title}</p>
                            <p>$ {pro?.price}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p>
                    Nothing is matches with your search keywords. Please try
                    again
                  </p>
                )}
              </div>
            )}{" "}
          </div>
        </div>
      </div>
      <Type />
    </section>
  );
};
export default MyNavbar;
