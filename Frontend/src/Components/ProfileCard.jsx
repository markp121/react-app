import React from "react";
import Modal from "./Modal";
import ProfileForm from "./Forms/ProfileForm";

const ProfileCard = ({ profilesState, updatedProfile, setUpdatedProfile, currentProfile, handleDeleteProfile }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-container">
        <img src={currentProfile.image} alt="user-image" className="profile-card-image"></img>
        <div className="profile-card-info">
          <h2>{currentProfile.name}</h2>
          <h3>{currentProfile.jobTitle}</h3>
          <p>{currentProfile.bio}</p>
          {/*<ul className="skill-list">*/}
          {/*  {skills.map((skill) => (*/}
          {/*    <li key={skill}>{skill}</li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <p>{currentProfile.skills}</p>
        </div>
        <div className="profile-card-buttons">
          <Modal openButtonClass={"icon-button edit"} openButtonInnerHtml={<i className="bi bi-pencil"></i>}>
            <ProfileForm
              profilesState={profilesState}
              changedProfile={updatedProfile}
              setChangedProfile={setUpdatedProfile}
              currentProfile={currentProfile}
              handleDeleteProfile={handleDeleteProfile}
            />
          </Modal>
          <button className="icon-button delete" onClick={() => handleDeleteProfile(currentProfile)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
