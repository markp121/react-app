import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import React, { useState } from "react";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import JobBoard from "../Components/JobBoard";
import DynamicList from "../Components/DynamicList";
import BotListManager from "../Components/BotListManager";
import bots from "../Data/Bots";

const Layout = () => {
  const [botsState, setBotsState] = useState(bots);

  return (
    <>
      <Header />
      <Main>
        <Sidebar sidebarClass={"left"}>
          <JobBoard botsState={botsState} />
        </Sidebar>
        <Sidebar sidebarClass={"right"}>
          <DynamicList />
          <BotListManager botsState={botsState} setBotsState={setBotsState} />
        </Sidebar>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
