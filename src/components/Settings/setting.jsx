import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Setting.css";
import Navbar from "../Navbar/Navbar";

const Settings = () => {

  const userId = localStorage.getItem("userId");

  const [user,setUser] = useState({
    name:"",
    email:"",
    bio:"",
    location:"",
    website:"",
    linkedin:"",
    youtube:"",
    instagram:""
  });

  // FETCH USER DATA
  useEffect(()=>{

    const getUser = async()=>{

      try{

        const res = await axios.get(
          `http://13.234.30.254:5000/user/${userId}`
        );

        setUser(res.data);

      }
      catch(err){
        console.log(err);
      }

    }

    getUser();

  },[userId]);



  // HANDLE INPUT CHANGE
  const handleChange = (e)=>{

    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }



  // UPDATE PROFILE
  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await axios.put(
        `http://13.234.30.254:5000/user/update/${userId}`,
        user
      );

      alert("Profile Updated Successfully");

    }
    catch(err){
      console.log(err);
    }

  }



  return (<>
<Navbar/>

    <div className="settings-container">
      {/* LEFT SIDEBAR */}

      <div className="settings-sidebar">

        <h3>Settings</h3>

        <ul>
          <li className="active">Public profile</li>
          <li>Account</li>
          <li>Appearance</li>
          <li>Notifications</li>
          <li>Repositories</li>
        </ul>

      </div>



      {/* RIGHT CONTENT */}

      <div className="settings-content">

        <h2>Public Profile</h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          />

          <label>Email</label>
          <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          />

          <label>Bio</label>
          <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          />

          <label>Website</label>
          <input
          type="text"
          name="website"
          value={user.website}
          onChange={handleChange}
          />

          <label>LinkedIn</label>
          <input
          type="text"
          name="linkedin"
          value={user.linkedin}
          onChange={handleChange}
          />

          <label>YouTube</label>
          <input
          type="text"
          name="youtube"
          value={user.youtube}
          onChange={handleChange}
          />

          <label>Instagram</label>
          <input
          type="text"
          name="instagram"
          value={user.instagram}
          onChange={handleChange}
          />

          <label>Location</label>
          <input
          type="text"
          name="location"
          value={user.location}
          onChange={handleChange}
          />

          <button type="submit">
            Update Profile
          </button>

        </form>

      </div>

    </div>
</>
  );

};

export default Settings;