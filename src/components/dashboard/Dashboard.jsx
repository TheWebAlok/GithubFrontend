import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {

    const userId = localStorage.getItem("userId");

    const fetchedRepositories = async () => {
      try {
        const response = await fetch(`https://github-backend-clone.onrender.com/repo/user/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          setRepositories([]);
        } else {
          setRepositories(data);
        }

      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchedSuggestRepositories = async () => {
      try {
        const response = await fetch(`https://github-backend-clone.onrender.com/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchedRepositories();
    fetchedSuggestRepositories();

  }, []);

  useEffect(() => {

    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {

      const filteredRepo = repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRepo);
    }

  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard" className="container-fluid">

        {/* Suggested repos */}
        <aside className="suggested1 col-md-2"> 
                   <h3>Suggested Repositories</h3>

                
          {suggestedRepositories.map((repo) => (
            <Link to={`/repo/${repo._id}`} key={repo._id} className="repo-card1">
              <div>
                <h4 style={{fontSize:"14px"}}>{repo.name}</h4>
              </div>
            </Link>
          ))}

        </aside>

        {/* Your repos */}
        <main className="col-md-7">

          <h3>Your Repositories</h3>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search...."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : searchResults.length === 0 ? (
            <p>No repositories found</p>
          ) : (
            searchResults.map((repo) => (
              <Link to={`/repo/${repo._id}`} key={repo._id} className="repo-card">
                <div>
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </div>
              </Link>
            ))
          )}

        </main>

        {/* Events */}
        <aside className="suggested1 col-md-3">

          <h3>Upcoming Events</h3>

          <ul>
            <li><p>Tech Conference</p></li>
            <li><p>Developer Meetup</p></li>
            <li><p>React Summit - Dec 5</p></li>
          </ul>

        </aside>

      </section>
    </>
  );
};

export default Dashboard;