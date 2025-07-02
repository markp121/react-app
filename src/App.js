import React from "react";
import "./Sass/app.scss";
import ProfileCard from "./Components/ProfileCard";

const App = () => {
  const profiles = [
    {
      id: 0,
      image: "https://picsum.photos/id/300/300",
      name: "Mark Powell",
      jobTitle: "Front-end Developer",
      bio: "Passionate about creating user-friendly applications",
      skills: ["Git", "GitHub", "JavaScript", "React", "HTML", "CSS", "PHP"],
    },
    {
      id: 1,
      image: "https://picsum.photos/id/200/300",
      name: "Mark Powell",
      jobTitle: "Front-end Developer",
      bio: "Passionate about creating users friendly applications",
      skills: ["Git", "GitHub", "JavaScript", "React", "HTML", "CSS", "PHP"],
    },
    {
      id: 2,
      image: "https://picsum.photos/id/100/300",
      name: "Mark Powell",
      jobTitle: "Front-end Developer",
      bio: "Passionate about creating users friendly applications",
      skills: ["Git", "GitHub", "JavaScript", "React", "HTML", "CSS", "PHP"],
    },
  ];

  return (
    <div>
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
    </div>
  );
};

export default App;
