import React from "react";

const ProfileCard = ({ image, name, jobTitle, bio, skills }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-container">
        <img src={image} alt="user-image" className="profile-card-image"></img>
        <div className="profile-card-info">
          <h2>{name}</h2>
          <h3>{jobTitle}</h3>
          <p>{bio}</p>
          <ul className="skill-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
