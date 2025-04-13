"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { setFavoriteProduct, setProductToCart } from "../_redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const TheCard = ({ product }) => {
  const dispatch = useDispatch();
  const isInCart = useSelector((state) =>
    state.products.cart.some((item) => item._id === product?._id)
  );
  const isFavorite = useSelector((state) =>
    state.products.favoriteProducts.some((item) => item._id === product?._id)
  );
  const addToCart = (id) => {
    if (!isInCart) {
      dispatch(setProductToCart(id));
      toast.success("Product is added to cart");
    }
  };
  return (
    <div className="group bg-white rounded-lg shadow-xl px-3 py-5 border border-slate-200 w-full sm:w-[48%] lg:w-[33%] xl:w-[24%] mb-5">
      {/* ========== Image ============= */}
      <div className="w-full overflow-hidden relative">
        <div className="absolute z-50 top-1/2 translate-x-20 group-hover:translate-x-0 right-0 transform -translate-y-1/2 text-center transition-all duration-300">
          <p
            onClick={() => dispatch(setFavoriteProduct(product?._id))}
            className="p-2 border border-slate-500 rounded-md cursor-pointer hover:bg-[#febd69]"
          >
            <FaHeart
              className={`text-2xl ${
                isFavorite ? "text-red-600" : "text-black"
              }`}
            />
          </p>
        </div>
        <p className="absolute top-1 right-0 z-50 text-amazon_blue font-medium text-sm tracking-wide animate-bounce">
          !save <span>${(product?.oldPrice - product?.price).toFixed(2)}</span>
        </p>
        <Link href={`/${product?._id}`}>
          <Image
            src={product?.image}
            width={300}
            height={300}
            className="w-full h-[385px] object-contain group-hover:scale-110 transition-all duration-300"
            alt="productImage"
          />
        </Link>
      </div>

      {/* ============ Line ================= */}
      <div className="border-[1px] border-slate-200/80 my-3"></div>
      {/* ============ Card Details ========== */}
      <div className="details">
        {/* category */}
        <p className="text-slate-500 text-[14px]mb-2">{product?.category}</p>
        {/* title */}
        <h1 className="text-[17px] font-semibold mb-2">{product?.title}</h1>
        {/* Price */}
        <p className="flex items-center gap-3 mb-2">
          <span className="line-through text-slate-400">
            $ {product?.oldPrice}
          </span>
          <span className="text-black font-bold">$ {product?.price}</span>
        </p>
        {/* description */}
        <p className="text-[14px] text-black tracking-[1px] mb-3 line-clamp-3">
          {product?.description}
        </p>
        {/* Add To Cart Button */}
        <div className="w-full text-center">
          <button
            onClick={() => addToCart(product?._id)}
            disabled={isInCart}
            className={`outline-none px-6 py-1 rounded-md capitalize text-lg font-medium transition-all duration-200 ${
              isInCart
                ? "bg-gray-300 text-black cursor-not-allowed"
                : "bg-black text-white hover:bg-[#febd69] hover:text-black"
            }`}
          >
            {isInCart ? "in cart" : "add to cart"}
          </button>
        </div>
      </div>
      {/* Actions */}
    </div>
  );
};

export default TheCard;
