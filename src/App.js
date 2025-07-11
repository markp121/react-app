import React from "react";
import "./Sass/app.scss";
import ProfileCard from "./Components/ProfileCard";
import JobBoard from "./Components/JobBoard";
import JobCounter from "./Components/JobCounter";
import DynamicList from "./Components/DynamicList";
import BotListManager from "./Components/BotListManager";
import Sidebar from "./Components/Sidebar";

import profiles from "./Data/Profiles";
import bots from "./Data/Bots";
import jobs from "./Data/Jobs";

const App = () => {
  return (
    <div>
      <Sidebar sidebarClass={"left"}>
        <JobBoard jobs={jobs} />
      </Sidebar>
      <Sidebar sidebarClass={"right"}>
        <DynamicList />
        <BotListManager bots={bots} />
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
    </div>
  );
};

export default App;
