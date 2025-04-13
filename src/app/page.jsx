"use client";
import React, { useEffect } from "react";
import Hero from "./_components/Hero";
import Products from "./_components/Products";
import { useDispatch } from "react-redux";
import { getInitialData } from "./_redux/productsSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData());
  }, []);
  return (
    <div>
      <Hero />
      <Products />
    </div>
  );
};

export default Home;
