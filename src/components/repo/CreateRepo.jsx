import React, { useState } from "react";
import axios from "axios";
import "./CreateRepo.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const CreateRepo = () => {

  const navigate = useNavigate();

  const [repositoryName, setRepositoryName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [files, setFiles] = useState([]);

  const userId = localStorage.getItem("userId");

  const handleCreateRepo = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("repositoryName", repositoryName);
      formData.append("description", description);
      formData.append("visibility", visibility);
      formData.append("userId", userId);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      await axios.post("https://github-backend-clone.onrender.com/repo/create", formData);

      toast.success("Repository created successfully");

      navigate("/");

    } catch (error) {

      toast.error("Error creating repository", error);

    }

  };

  return (
    <>
    <Navbar/>
      <div className="repo-wrapper">

        <ToastContainer />

        <h1>Create a new repository</h1>

        <p className="subtitle">
          Repositories contain a project's files and version history.
        </p>

        <form onSubmit={handleCreateRepo} className="repo-form">

          {/* Owner + Repo name */}

          <label>Repository name *</label>

          <div className="repo-name-box">

            <span className="owner">{userId}</span>

            <input
              type="text"
              placeholder="repository-name"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              required
            />

          </div>

          {/* Description */}

          <label>Description (optional)</label>

          <textarea
            placeholder="Write a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Visibility */}

          <label>Choose visibility</label>

          <div className="visibility-box">

            <label>
              <input
                type="radio"
                value="public"
                checked={visibility === "public"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Public
            </label>

            <label>
              <input
                type="radio"
                value="private"
                checked={visibility === "private"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Private
            </label>

          </div>

          {/* Upload folder */}

          <label>Upload Project Folder</label>

          <input
            type="file"
            webkitdirectory="true"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />

          {/* Button */}

          <button type="submit" className="create-btn">
            Create repository
          </button>

        </form>
        {repositoryName && (

          <div className="quick-setup">

            <h3>Quick setup — if you've done this kind of thing before</h3>

            <div className="code-box">

              <pre>
                {`echo "# ${repositoryName}" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/${userId}/${repositoryName}.git
git push -u origin main`}
              </pre>

            </div>

          </div>

        )}
      </div>

    </>
  );

};

export default CreateRepo;