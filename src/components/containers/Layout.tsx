import React from "react";
import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <div
      style={{
        maxWidth: 1024,
        margin: "0 auto",
        padding: "1rem",
      }}
      className={"layout"}>
      <Outlet />
    </div>
  );
}
