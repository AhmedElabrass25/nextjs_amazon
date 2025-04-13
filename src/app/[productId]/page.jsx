"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  getInitialData,
  getProductDetails,
  setFavoriteProduct,
  setProductToCart,
} from "../_redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params?.productId;
  const { products } = useSelector((state) => state);
  const selectProduct = products?.selectProduct;
  const isInCart = useSelector((state) =>
    state.products.cart.some((item) => item._id === selectProduct?._id)
  );
  const isFavorite = useSelector((state) =>
    state.products.favoriteProducts.some(
      (item) => item._id === selectProduct?._id
    )
  );
  const addToCart = (id) => {
    if (!isInCart) {
      dispatch(setProductToCart(id));
      toast.success("Product is added to cart");
    }
  };
  // When i refresh page get data from localStorage
  useEffect(() => {
    dispatch(getInitialData());
  }, []);
  useEffect(() => {
    if (productId && products.allProducts.length > 0) {
      dispatch(getProductDetails(productId));
    }
  }, [productId, products.allProducts.length, dispatch]);

  return (
    <>
      <section className="my-6">
        <div className="container">
          {selectProduct !== null && (
            <div className="group w-full flex flex-col md:flex-row items-center justify-center my-6">
              {/* ========== Image ============= */}
              <div className="overflow-hidden relative w-full md:w-1/2 bg-[#e5e7eb] rounded-tr-lg rounded-tl-lg md:rounded-tl-lg md:rounded-bl-lg">
                <div className="absolute z-50 top-1/2 translate-x-20 group-hover:translate-x-0 right-3 transform -translate-y-1/2 text-center transition-all duration-300">
                  <p
                    onClick={() =>
                      dispatch(setFavoriteProduct(selectProduct?._id))
                    }
                    className="p-2 border border-slate-500 rounded-md cursor-pointer hover:bg-[#febd69]"
                  >
                    <FaHeart
                      className={`text-2xl ${
                        isFavorite ? "text-red-600" : "text-black"
                      }`}
                    />
                  </p>
                </div>
                {selectProduct?.image ? (
                  <Image
                    src={selectProduct?.image}
                    width={300}
                    height={300}
                    className="w-full h-[390px] object-contain group-hover:scale-110 transition-all duration-300"
                    alt="productImage"
                  />
                ) : (
                  <div className="w-full h-[390px] bg-gray-300 flex items-center justify-center">
                    <span className="text-center text-white">
                      No image available
                    </span>
                  </div>
                )}
              </div>
              {/* ============ Card Details ========== */}
              <div className="details bg-[#f3f4f6] h-[390px] w-full md:w-1/2 rounded-br-lg rounded-bl-lg md:rounded-tr-lg md:rounded-br-lg p-5">
                {/* category */}
                <p className="text-slate-500 text-lg mb-3">
                  {selectProduct?.category}
                </p>
                {/* title */}
                <h1 className="text-2xl font-semibold mb-3">
                  {selectProduct?.title}
                </h1>
                {/* Price */}
                <p className="flex items-center gap-3 mb-3">
                  <span className="line-through text-slate-400">
                    $ {selectProduct?.oldPrice}
                  </span>
                  <span className="text-black font-bold">
                    $ {selectProduct?.price}
                  </span>
                </p>
                {/* description */}
                <p className="text-[17px] text-gray-600 tracking-[1px] mb-5 line-clamp-3">
                  {selectProduct?.description}
                </p>
                {/* Add To Cart Button */}
                <div className="w-full text-center">
                  <button
                    onClick={() => addToCart(selectProduct?._id)}
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
          )}
          {/* ======== Go to shopping button ==== */}
          <div className="w-full flex items-center justify-center">
            <Link
              href="/"
              className="outline-none px-8 py-3 rounded-md bg-black text-white capitalize text-lg font-medium hover:bg-[#febd69] hover:text-black transition-all duration-200"
            >
              Go to shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
