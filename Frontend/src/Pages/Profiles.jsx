import React, { useEffect, useState } from "react";
import ProfileCard from "../Components/ProfileCard";
import JobCounter from "../Components/JobCounter";
import axios from "axios";
import Modal from "../Components/Modal";
import ProfileForm from "../Components/Forms/ProfileForm";

const Profiles = () => {
  const [profilesState, setProfilesState] = useState([]);
  const [newProfile, setNewProfile] = useState();
  const [updatedProfile, setUpdatedProfile] = useState();
  const [deleteProfile, setDeleteProfile] = useState(false);


  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        return await axios.get("http://localhost:8800/profiles");
      } catch (error) {
        console.log(error);
      }
    };
    if (!newProfile && !updatedProfile) {
      fetchAllProfiles().then((res) => setProfilesState(res.data));
    }
  }, [newProfile, updatedProfile, deleteProfile]);

  const handleDeleteProfile = (profile, closeModal = () => {}) => {
    const confirm = window.confirm("Are you sure you want to delete this profile?");
    const deleteProfile = async () => {
      try {
        await axios.delete("http://localhost:8800/profiles/" + profile.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (confirm) {
      deleteProfile().then(() => setDeleteProfile((prev) => !prev));
      closeModal();
    }
  };

  return (
    <>
      <div className="profiles-header-container">
        <h1>Team Profiles</h1>
        <div className="profiles-header-info">
          <h2>Team Members</h2>
          <p>
            This is a list of all the team members. You can click on a profile to view their
            details.
          </p>
          <Modal openButtonClass={"button neutral"} openButtonInnerHtml={"Add Profile"}>
            <ProfileForm
              profilesState={profilesState}
              changedProfile={newProfile}
              setChangedProfile={setNewProfile}
            />
          </Modal>
        </div>
      </div>
      <ul>
        {profilesState.map((profile) => (
          <li key={profile.id}>
            <ProfileCard
              profilesState={profilesState}
              updatedProfile={updatedProfile}
              setUpdatedProfile={setUpdatedProfile}
              currentProfile={profile}
              handleDeleteProfile={handleDeleteProfile}
            />
          </li>
        ))}
      </ul>
      <JobCounter />
    </>
  );
};

export default Profiles;
