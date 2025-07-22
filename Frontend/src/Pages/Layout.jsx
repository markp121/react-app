import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import React, { useEffect, useState } from "react";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import JobBoard from "../Components/JobBoard";
import DynamicList from "../Components/DynamicList";
import BotListManager from "../Components/BotListManager";
import bots from "../Data/Bots";
import axios from "axios";

const Layout = () => {
  const [botsState, setBotsState] = useState(bots);
  const [jobsState, setJobsState] = useState([]);

  const contextValue = { botsState, jobsState, setJobsState };

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/jobs");
        setJobsState(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllJobs();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Sidebar sidebarClass={"left"}>
          <JobBoard botsState={botsState} jobsState={jobsState} setJobsState={setJobsState} />
        </Sidebar>
        <Sidebar sidebarClass={"right"}>
          <DynamicList />
          <BotListManager botsState={botsState} setBotsState={setBotsState} />
        </Sidebar>
        <Outlet context={contextValue} />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
