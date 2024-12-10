import React from "react";
import { HashRouter, Link, Route, Routes } from "react-router";
import Home from "./pages/home.page";
import Login from "./pages/login.page";

const Root = () => {
  return (
    <HashRouter>
      <Routes>
        
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Root;
