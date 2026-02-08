import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Footer2 from "../Footer2/Footer2";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
        {children}
      <Footer2 />
      <Footer />
    </div>
  );
};

export default PublicLayout;
