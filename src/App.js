import React, { useState } from "react";
import "./Sass/app.scss";
import ProfileCard from "./Components/ProfileCard";
import JobBoard from "./Components/JobBoard";
import JobCounter from "./Components/JobCounter";
import DynamicList from "./Components/DynamicList";
import BotListManager from "./Components/BotListManager";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

import profiles from "./Data/Profiles";
import bots from "./Data/Bots";
import jobs from "./Data/Jobs";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

const App = () => {
  const [botsState, setBotsState] = useState(bots);

  return (
    <>
      <Header />
      <Main>
        <Sidebar sidebarClass={"left"}>
          <JobBoard
            jobs={jobs}
            botsState={botsState}
          />
        </Sidebar>
        <Sidebar sidebarClass={"right"}>
          <DynamicList />
          <BotListManager
            botsState={botsState}
            setBotsState={setBotsState}
          />
        </Sidebar>
        <h1>Team Profiles</h1>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <ProfileCard
                image={profile.image}
                name={profile.name}
                jobTitle={profile.jobTitle}
                bio={profile.bio}
                skills={profile.skills}
              />
            </li>
          ))}
        </ul>
        <JobCounter />
      </Main>
      <Footer />
    </>
  );
};

export default App;
