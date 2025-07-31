import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Pages/Layout";
import Profiles from "./Pages/Profiles";
import Jobs from "./Pages/Jobs";
import JobPage from "./Pages/JobPage";

import "./Sass/app.scss";
import NotFound from "./Pages/NotFound.jsx";
import InvestmentCalc from "./Pages/InvestmentCalc.jsx";
import Home from "./Pages/Home.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobPage />} />
          <Route path="investment-calculator" element={<InvestmentCalc />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
