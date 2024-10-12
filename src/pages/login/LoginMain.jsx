import React from "react";

import { Outlet } from "react-router-dom";
import Login from "./login/Login";

const LoginMain = () => {
  return (
    <>
      <Login />
      <Outlet />
    </>
  );
};
export default LoginMain;
