import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
