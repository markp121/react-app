import React from "react";
import "./Sass/app.scss";
import ProfileCard from "./Components/ProfileCard";
import JobBoard from "./Components/JobBoard";
import JobCounter from "./Components/JobCounter";

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

  const jobs = [
    {
      id: 0,
      companyName: "Tech Inc",
      jobName: "Front-end developer",
      description: "Design and implement single page application",
      requiredSkills: ["Git", "JavaScript", "React", "HTML", "CSS"],
      status: "Assigned",
    },
    {
      id: 1,
      companyName: "Tech Inc",
      jobName: "Back-End developer",
      description: "Design and implement efficient back end architecture for a POS application",
      requiredSkills: ["TypeScript", "Next.JS", "SQL"],
      status: "Finished",
    },
    {
      id: 2,
      companyName: "Dev Corp",
      jobName: "Front-end tester",
      description: "Manual testing of front-end UI",
      requiredSkills: ["Manual testing", "detail orientated"],
      status: "Finished",
    },
    {
      id: 3,
      companyName: "Web Design Co",
      jobName: "Web designer",
      description: "Conceptualise intuitive and satisfying UIs",
      requiredSkills: ["Web Design"],
      status: "Unassigned",
    },
    {
      id: 4,
      companyName: "Software testing",
      jobName: "Developer in test",
      description: "Create automated tests for a web app",
      requiredSkills: ["Selenium", "Java", "Git"],
      status: "Finished",
    },
    {
      id: 5,
      companyName: "Software testing",
      jobName: "Developer in test",
      description: "Create automated tests for a web app",
      requiredSkills: ["Selenium", "Java", "Git"],
      status: "Finished",
    },
  ];

  return (
    <div>
      <aside>
        <JobBoard jobs={jobs} />
      </aside>
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
