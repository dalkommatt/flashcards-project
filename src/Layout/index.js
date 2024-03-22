import React, { useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./Home";
import Decks from "../Decks/Decks";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/decks/*" element={<Decks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
