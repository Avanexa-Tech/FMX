import React from "react";
import { Outlet } from "react-router-dom";
import { whiteLogo } from "../assets/images";

const AuthLayout = () => {
  return (
    <div className="authentication">
      <div className="auth-left">
        <div className="auth-asset"></div>
        <div className="auth-left-content">
          <img src={whiteLogo} alt="logo" />
          <div className="tagline">
            <h2>
              Streamline,
              <br /> Simplify, Succeed !
            </h2>
            <p>
              Designed to streamline workflows, simplify asset management, and
              drive success, we help you keep your operations running smoothly
              and efficiently
            </p>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-content">
          <Outlet />
          <p className="common-acceptance">
            By creating an account, you adhere to the <br />
            <b>Terms Of Service</b> and <b>Privacy Policy</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
