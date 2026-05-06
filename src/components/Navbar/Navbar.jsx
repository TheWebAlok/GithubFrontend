import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/github-mark-white.svg";
import plus from "../../assets/plus.png";
import search from "../../assets/search.png";
import profile from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../authContext";
import axios from "axios";

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {

    const fetchedUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://github-backend-clone.onrender.com/userProfile/${userId}`
        );

        setUserDetails(response.data);

      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchedUserDetails();

  }, []);
  return (
    <div className="navB">

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      <nav className="navbar w-100 border-bottom">

        {/* LEFT SIDE */}
        <div className="nav-left">

          {/* TOGGLE BUTTON */}
          <button className="menu-btn" onClick={() => setOpen(true)}>
            ☰
          </button>

          <Link to="/" className="logo-area">
            <img src={logo} alt="logo" />
            <h3>GitHub</h3>
          </Link>



        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          <div>
            <img style={{
              height: "30px", position: "absolute", right: "11%", color: "red", marginTop: "5px"
            }} src={search} alt="" />
            <input
              type="text"
              placeholder="Type / to search"
              className="search"
            />
          </div>

          <div className="dropdown">
            <button className="drop-btn">
              <img src={plus} alt="plus" />
            </button>

            <div className="dropdown-content">

              <Link to="/issue">New issue</Link>
              <Link to="/create/repo">New repository</Link>
              <Link to="/import">Import repository</Link>
              <Link to="/codespace">New codespace</Link>
              <Link to="/gist">New gist</Link>
              <Link to="/organization">New organization</Link>
              <Link to="/project">New project</Link>

            </div>
          </div>
          <div className="profile-dropdown">

            <img
              src={profile}
              alt="profile"
              className="profile"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (

              <div className="profile-menu">

                <div className="profile-header">
                  {userDetails ? (
                    <>
                      <Link style={{borderRadius:"14px" ,width:'100%'}} to="/profile"><h5>{userDetails?.user?.username}</h5></Link>
                      <p>{userDetails?.user?.email}</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <Link to="/profile">Profile</Link>
                <Link to="/repositories">Repositories</Link>
                <Link to="/stars">Stars</Link>
                <Link to="/gists">Gists</Link>

                <hr />

                <Link to="/settings">Settings</Link>

                <hr />

                <Link to="/logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    setCurrentUser(null);
                    navigate("/auth");
                  }}
                >Sign out</Link>

              </div>

            )}

          </div>

        </div>

      </nav>

    </div>
  );
};

export default Navbar;