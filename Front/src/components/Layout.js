import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
export const Layout = ({ log, setlogout, savedvalue }) => {
  return (
    <>
      <Header log={log} setlogout={setlogout} savedvalue={savedvalue} />
      <Outlet />
    </>
  );
};
