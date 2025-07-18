import React from "react";
import profiles from "../Data/Profiles";
import ProfileCard from "../Components/ProfileCard";
import JobCounter from "../Components/JobCounter";

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
