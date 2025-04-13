"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import store from "./_redux/store";
import MyNavbar from "./_components/MyNavbar";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";

const ParentComponent = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <MyNavbar />
        <Toaster />
        {children}
        <Footer />
      </Provider>
    </SessionProvider>
  );
};

export default ParentComponent;
