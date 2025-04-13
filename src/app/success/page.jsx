"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../_redux/productsSlice";
import Link from "next/link";

const SuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className="flex items-center justify-center h-[80vh] flex-col">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-700 mb-3">Thank you for your purchase!</p>
      <Link
        href={"/"}
        className="bg-black px-6 py-3 text-white text-lg rounded-lg"
      >
        Go to home
      </Link>
    </div>
  );
};

export default SuccessPage;
