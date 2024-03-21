import React from "react";
import {Routes, Route} from "react-router-dom";
import {CharactersListPage} from "./pages/characters/CharactersListPage";
import {Layout} from "./containers/Layout";
import {HouseDetailsPage} from "./pages/houses/HouseDetailsPage";
import {ErrorBar} from "./ui/ErrorBar";

export function GlobalRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CharactersListPage />} />
        <Route path="/houses/:houseId" element={<HouseDetailsPage />} />
        <Route path="*" element={<ErrorBar message={"Not found... 404"} />} />
      </Route>
    </Routes>
  );
}
