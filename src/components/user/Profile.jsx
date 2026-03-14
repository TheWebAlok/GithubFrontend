import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import logo from "../../assets/github-mark-white.svg";
import book from "../../assets/open-book.png";
import star from "../../assets/calendar.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { setCurrentUser } = useAuth();
  

  useEffect(() => {

    const fetchedUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://13.234.30.254t:5000/userProfile/${userId}`
        );

        setUserDetails(response.data);

      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchedUserDetails();

  }, []);

  return (
    <>

      <Navbar />

      <div className="row">
        <div className="col-md-4">
          <div className=" profile-tabs">
            <span className="tab">
              <img src={book} alt="overview icon" />
              Overview
            </span>

            <span className="tab">
              <img src={star} alt="star icon" />
              Starred Repository
            </span>
          </div>

          <div className="profile-container">
            <img src={logo} alt="profile" />

            {userDetails ? (
              <>
                <h2>{userDetails?.user?.username}</h2>
                <p>{userDetails?.user?.email}</p>
              </>
            ) : (
              <p>Loading profile...</p>
            )}

            <button>Follow</button>

            <p>10 Followers • 3 Following</p>
          </div>

        </div>
        <div className="col-md-6">
          <div className=" profile-tabs">
            <h6 className="">Recent Contribution</h6>
          </div>
          <div className="heatmap-section">
            <HeatMapProfile />
          </div>
        </div>
        <div className="col-md-2">
          <button
            style={{ position: "fixed", bottom: "50px", right: "50px" }}
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              setCurrentUser(null);
              navigate("/auth");
            }}
          >
            Logout
          </button>
          <h4>Organizations</h4>
          <p>No organizations</p>

          <h4 className="mt-3">Activity</h4>
          <p>Last commit 2 days ago</p>



        </div>

      </div>
    </>
  );
};

export default Profile;