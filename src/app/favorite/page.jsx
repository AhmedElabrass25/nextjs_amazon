"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialData,
  removeFromFavorite,
  setProductToCart,
} from "../_redux/productsSlice";
import toast from "react-hot-toast";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favoriteProducts } = useSelector((state) => state.products);
  const addToCart = (id) => {
    dispatch(setProductToCart(id));
    dispatch(removeFromFavorite(id));
    toast.success("Product is added to cart");
  };
  useEffect(() => {
    dispatch(getInitialData());
  }, []);
  return (
    <section>
      <div className="container">
        {/* if favorite is empty */}
        {favoriteProducts?.length == 0 && (
          <p className="bg-slate-800 py-3 px-6 my-5 text-lg text-white text-center">
            There is no products in favorite.......!
          </p>
        )}
        {/* title */}
        <h1 className="w-full text-center text-2xl capitalize mt-5 font-medium">
          Favorite Items
        </h1>
        {/* display favorite products */}
        {favoriteProducts.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 bg-white">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {favoriteProducts.map((pro) => {
                  return (
                    <tr
                      key={pro?._id}
                      className="bg-slate-200 border-b border-gray-500"
                    >
                      {pro?.image && (
                        <td className="p-4">
                          <img
                            src={pro?.image}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                      )}
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {pro?.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${pro?.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => addToCart(pro?._id)}
                          className={`outline-none px-6 py-1 rounded-md capitalize text-lg font-medium transition-all duration-200 bg-black text-white hover:bg-[#febd69] hover:text-black
                          `}
                        >
                          {"add to cart"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorite;
