import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Decks from "../Decks/Decks";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/*" element={<Decks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
