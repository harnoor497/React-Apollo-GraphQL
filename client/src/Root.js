import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShowPage from "./pages/ShowPage";

const Root = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/people/:id"
        element={<ShowPage />}
      />
    </Routes>
  );
};


export default Root;