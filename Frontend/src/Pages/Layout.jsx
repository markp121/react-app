import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import JobBoard from "../Components/JobBoard";
import DynamicList from "../Components/DynamicList";
import BotListManager from "../Components/BotListManager";

const Layout = () => {
  const [botsState, setBotsState] = useState([]);
  const [newBot, setNewBot] = useState();
  const [updatedBot, setUpdatedBot] = useState();
  const [deleteBot, setDeleteBot] = useState(false);
  const [jobsState, setJobsState] = useState([]);
  const [newJob, setNewJob] = useState();
  const [updatedJob, setUpdatedJob] = useState();
  const [deleteJob, setDeleteJob] = useState(false);

  const updatedJobIdRef = useRef();

  const contextValue = { jobsState, botsState, setNewJob, setUpdatedJob, updatedJobIdRef };

  useEffect(() => {
    const postNewJob = async () => {
      try {
        await axios.post("http://localhost:8800/jobs", newJob);
      } catch (err) {
        console.log(err);
      }
    };

    const updateJob = async () => {
      try {
        await axios.put("http://localhost:8800/jobs/" + updatedJobIdRef.current, updatedJob);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/jobs");
        setJobsState(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (newJob) {
      postNewJob();
      setNewJob();
    } else if (updatedJob) {
      updateJob();
      setUpdatedJob();
    } else {
      fetchAllJobs();
    }
  }, [newJob, updatedJob, deleteJob]);

  useEffect(() => {
    const fetchAllBots = async () => {
      try {
        const res = await axios.get("http://localhost:8800/bots");
        setBotsState(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBots();
  }, [newBot, updatedBot, deleteBot]);

  const handleDeleteJob = async (job, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      try {
        await axios.delete("http://localhost:8800/jobs/" + job.id);
        setDeleteJob((prev) => !prev);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteBot = async (bot, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    if (confirm) {
      try {
        await axios.delete("http://localhost:8800/bots/" + bot.id);
        setDeleteBot((prev) => !prev);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <Main>
        <Sidebar sidebarClass={"left"}>
          <JobBoard
            jobsState={jobsState}
            botsState={botsState}
            setNewJob={setNewJob}
            setUpdatedJob={setUpdatedJob}
            updatedJobIdRef={updatedJobIdRef}
            handleDeleteJob={handleDeleteJob}
          />
        </Sidebar>
        <Sidebar sidebarClass={"right"}>
          <DynamicList />
          <BotListManager
            botsState={botsState}
            newBot={newBot}
            setNewBot={setNewBot}
            updatedBot={updatedBot}
            setUpdatedBot={setUpdatedBot}
            handleDeleteBot={handleDeleteBot}
          />
        </Sidebar>
        <Outlet context={contextValue} />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
