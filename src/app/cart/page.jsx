"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import {
  decreaseProductQuantity,
  getInitialData,
  increaseProductQuantity,
  removeProductCart,
} from "../_redux/productsSlice";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Cart = () => {
  const data = useSession();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);
  let totalPrice = cart
    .map((pro) => pro.price * pro.quantity)
    .reduce((x, y) => x + y, 0);
  const removeProduct = (id) => {
    const confirmation = confirm("Are you sure to delete this product ?");
    if (confirmation) {
      dispatch(removeProductCart(id));
    }
  };
  // =========== CheckOut Operation  ===============
  const handleClick = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }), // <-- use the cart from Redux
    });

    const data = await res.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  // =========== CheckOut Operation ===============
  useEffect(() => {
    dispatch(getInitialData());
  }, []);
  return (
    <section>
      <div className="container">
        {/* if cart is empty */}
        {cart?.length == 0 && (
          <p className="bg-slate-800 py-3 px-6 my-5 text-lg text-white text-center">
            There is no products in cart.......!
          </p>
        )}
        {/* Title */}
        <h1 className="w-full text-center text-2xl capitalize mt-5 font-medium">
          shopping Cart
        </h1>
        {/* Cart Products */}
        {cart.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 bg-white">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="p-5">
                {cart.map((pro) => {
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
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              dispatch(decreaseProductQuantity(pro))
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <LuMinus />
                          </button>
                          <span>{pro?.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(increaseProductQuantity(pro))
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${pro?.price * pro?.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeProduct(pro?._id)}
                          className="font-medium text-red-600"
                        >
                          <FaTrashAlt className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* ========Check Out========= */}
        <div className=" w-full flex items-center justify-center my-6">
          <div className="w-full md:w-[600px] bg-white rounded-lg p-5 text-center  border-[5px] border-slate-500/20">
            <p className="mb-3">
              Your order qualifies for FREE Shipping by Choosing this option at
              checkout. See details...
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="capitalize text-lg">total</span>
              <span className="capitalize text-lg">$ {totalPrice || 0}</span>
            </div>
            {data?.status === "authenticated" ? (
              <button
                onClick={handleClick}
                className="w-full h-10 text-[17px] tracking-[1px] font-semibold bg-black text-white rounded-lg hover:bg-[#febd69] hover:text-black transition-all duration-200"
              >
                proceed to buy
              </button>
            ) : (
              <div>
                <button className="w-full h-10 text-[17px] tracking-[1px] font-semibold bg-opacity-50 bg-slate-600 text-white rounded-lg cursor-not-allowed">
                  proceed to buy
                </button>
                <p className="text-sm mt-3 text-red-500 font-medium animate-bounce">
                  Please login to continue
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
