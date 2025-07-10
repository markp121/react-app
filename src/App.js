import React from "react";
import "./Sass/app.scss";
import ProfileCard from "./Components/ProfileCard";
import JobBoard from "./Components/JobBoard";
import JobCounter from "./Components/JobCounter";
import DynamicList from "./Components/DynamicList";
import BotListManager from "./Components/BotListManager";
import profiles from "./Data/Profiles";
import bots from "./Data/Bots";
import jobs from "./Data/Jobs";

const App = () => {
  return (
    <div>
      <aside className="sidebar left">
        <JobBoard jobs={jobs} />
      </aside>
      <h1>Team Profiles</h1>
      <aside className="sidebar right">
        <DynamicList />
        <BotListManager bots={bots} />
      </aside>
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
