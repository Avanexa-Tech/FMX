import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import FMXHeader from "../components/header/FMXHeader";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <div className="fmx-product">
        <Sidebar />
        <div className="fmx-page-container">
          <FMXHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
