import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
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
  const [draggedJob, setDraggedJob] = useState();

  const updatedJobIdRef = useRef();

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
        await axios.patch("http://localhost:8800/jobs/" + updatedJobIdRef.current, updatedJob);
      } catch (err) {
        console.log(err);
      }
    };

    const dragJob = async () => {
      try {
        await axios.put("http://localhost:8800/Jobs/" + updatedJobIdRef.current, draggedJob);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllJobs = async () => {
      try {
        return await axios.get("http://localhost:8800/jobs");
      } catch (error) {
        console.log(error);
      }
    };
    if (newJob) {
      postNewJob().then(() => setNewJob());
    } else if (updatedJob) {
      updateJob().then(() => setUpdatedJob());
    } else if (draggedJob) {
      dragJob().then(() => setDraggedJob());
    } else {
      fetchAllJobs().then((res) => setJobsState(res.data));
    }
  }, [newJob, updatedJob, deleteJob, draggedJob, deleteBot]);

  useEffect(() => {
    const fetchAllBots = async () => {
      try {
        return await axios.get("http://localhost:8800/bots");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBots().then((res) => setBotsState(res.data));
  }, [newBot, updatedBot, deleteBot]);

  const handleDeleteJob = (job, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    const deleteJob = async () => {
      try {
        await axios.delete("http://localhost:8800/jobs/" + job.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (confirm) {
      deleteJob().then(() => setDeleteJob((prev) => !prev));
      closeModal();
    }
  };

  const handleDeleteBot = (bot, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this bot?");
    const deleteBot = async () => {
      try {
        await axios.delete("http://localhost:8800/bots/" + bot.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (confirm) {
      deleteBot().then(() => setDeleteBot((prev) => !prev));
      closeModal();
    }
  };

  return (
    <>
      <Header />
      <main>
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
        <Outlet
          context={{
            jobsState,
            botsState,
            setNewJob,
            setUpdatedJob,
            setDraggedJob,
            updatedJobIdRef,
            handleDeleteJob,
          }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
