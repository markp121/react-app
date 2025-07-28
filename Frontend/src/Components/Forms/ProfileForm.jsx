import React, { useEffect } from "react";
import axios from "axios";

const BotForm = ({ profilesState, changedProfile, setChangedProfile, currentProfile, handleDeleteProfile, onSuccess }) => {
  const handleSubmitProfileForm = (e) => {
    e.preventDefault();
    const profileName = e.target.querySelector("#profileName");
    const profileJobTitle = e.target.querySelector("#profileJobTitle")
    const profileBio = e.target.querySelector("#profileBio");
    const profileSkills = e.target.querySelector("#profileSkills");
    const profileImage = e.target.querySelector("#profileImage");

    const profiles = currentProfile ? profilesState.filter((a) => a.id !== currentProfile.id) : profilesState;
    if (profiles.map((a) => a.name.toLowerCase()).includes(profileName.value.toLowerCase())) {
      alert("Duplicate Profile Name!");
      return false;
    } else {
      setChangedProfile({
        name: profileName.value,
        jobTitle: profileJobTitle.value,
        bio: profileBio.value,
        skills: profileSkills.value,
        image: profileImage.value,
      });
    }
    onSuccess();
  };

  useEffect(() => {
    const newProfile = async () => {
      try {
        await axios.post("http://localhost:8800/profiles", changedProfile);
      } catch (err) {
        console.log(err);
      }
    };
    const updateProfile = async () => {
      try {
        await axios.put("http://localhost:8800/profiles/" + currentProfile.id, changedProfile);
      } catch (err) {
        console.log(err);
      }
    };
    if (changedProfile) {
      if (currentProfile) {
        updateProfile().then(() => setChangedProfile());
      } else {
        newProfile().then(() => setChangedProfile());
      }
    }
  }, [changedProfile, currentProfile, setChangedProfile]);

  return (
    <div className="profile-form-container">
      <div className="form-header">
        <h2>New Bot</h2>
        {currentProfile && (
          <button className="button danger" onClick={() => handleDeleteProfile(currentProfile, onSuccess)}>
            Delete
          </button>
        )}
      </div>
      <form onSubmit={handleSubmitProfileForm}>
        <div className="form-inputs">
          <div>
            <label htmlFor="profileName">Profile Name:</label>
            <br />
            <input
              type="text"
              id="profileName"
              defaultValue={currentProfile ? currentProfile.name : ""}
              placeholder="Enter profile name..."
              required
            />
          </div>
          <div className="form-group-textarea">
            {/*<label htmlFor="profileBio">Bio:</label>*/}
            <textarea
              id="profileBio"
              defaultValue={currentProfile ? currentProfile.bio : ""}
              placeholder="Enter bio..."
              required
            />
          </div>
          <div>
            <label htmlFor="profileJobTitle">Job Title:</label> <br />
            <input
              type="text"
              id="profileJobTitle"
              defaultValue={currentProfile ? currentProfile.jobTitle : ""}
              placeholder="Enter job title..."
              required
            />
          </div>

          <div>
            <label htmlFor="profileSkills">Skills</label> <br />
            <input
              type="text"
              id="profileSkills"
              defaultValue={currentProfile ? currentProfile.skills : ""}
              placeholder="Enter skills..."
              required
            />
          </div>
          <div>
            <label htmlFor="profileImage">Image</label> <br />
            <input
              type="text"
              id="profileImage"
              defaultValue={currentProfile ? currentProfile.image : ""}
              placeholder="Enter image URL..."
            />
          </div>
        </div>
        <button type="submit" className="button success">
          {currentProfile ? "Save Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default BotForm;
