import React from "react";
import {CircularProgress} from "@mui/joy";

export function LoadingInfo() {
  return (
    <div style={{padding: 32, display: "flex", justifyContent: "center"}}>
      <CircularProgress />
    </div>
  );
}
