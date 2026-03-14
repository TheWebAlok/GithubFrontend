import React, { useEffect, useState } from "react";
import axios from "axios";

const Issue = ({ repoId }) => {

  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ================= GET ISSUES ================= */
  const fetchIssues = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/issues/${repoId}`);
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [repoId]);

  /* ================= CREATE ISSUE ================= */
  const createIssue = async () => {
    try {
      await axios.post(`http://13.234.30.254:5000/api/issues/${repoId}`, {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchIssues();

    } catch (error) {
      console.error("Error creating issue", error);
    }
  };

  return (
    <div>

      <h2>Issues</h2>

      {/* Create Issue Form */}

      <input
        type="text"
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Issue description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createIssue}>Create Issue</button>

      {/* Issue List */}

      <ul>
        {issues.map((issue) => (
          <li key={issue._id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <span>Status: {issue.status}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Issue;