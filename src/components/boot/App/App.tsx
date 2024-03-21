import React from "react";
import "@fontsource/inter";
import {BrowserRouter} from "react-router-dom";
import {GlobalRoutes} from "../../GlobalRoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalRoutes />
    </BrowserRouter>
  );
}

export default App;
