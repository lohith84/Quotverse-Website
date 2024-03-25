import React from "react";
import "../../App.css";

const Userprofile = () => {
  return (
    <>
      <div className="profileBox">
        <div className="profilePic">
          <img src="../img/profileIcon.png" alt="" />
        </div>
        <div className="profileName">
          John Doe<div className="profileId">johndoe</div>
        </div>
        <div className="profileDesc">
          UI Developer | Let's redesign the world
        </div>
        <div className="profileLikes">2957 likes .</div>
      </div>
    </>
  );
};

export default Userprofile;
