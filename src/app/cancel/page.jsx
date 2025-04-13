"use client";

import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] flex-col text-center px-4">
      <FaTimesCircle className="text-red-600 text-5xl mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-red-600">
        Payment Cancelled
      </h1>
      <p className="text-gray-700 mb-6">
        You cancelled the payment. Your cart is still available.
      </p>
      <Link
        href="/cart"
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all"
      >
        Back to Cart
      </Link>
    </div>
  );
};

export default CancelPage;
