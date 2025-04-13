"use client";
import React, { useEffect } from "react";
import TheCard from "./TheCard";
import { getAllProducts } from "../_redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";

const Products = () => {
  const { products } = useSelector((state) => state);
  const allProducts = products?.allProducts;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <section className="mb-6">
      <div className="container">
        {products?.isLoading && <Loading />}
        <div className="row flex items-center justify-between flex-wrap">
          {allProducts?.length > 0 &&
            allProducts?.map((product) => {
              return <TheCard key={product?._id} product={product} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Products;
