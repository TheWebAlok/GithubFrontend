import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Repodetails.css";

const RepoDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`http://13.234.30.254:5000/repo/${id}`)
      .then(res => res.json())
      .then(data => setRepo(data));
  }, [id]);

  const deleteRepo = async () => {
    try {
      await fetch(`http://13.234.30.254:5000/repo/delete/${id}`, {
        method: "DELETE"
      });

      toast.success("Repository deleted");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error("Delete failed",error);
    }
  };

  if (!repo) return <p className="loading">Loading...</p>;

  return (

    <div className="repo-container">

      <ToastContainer />

      <div className="repo-header">

        <h2>{repo.owner?.username} / <span>{repo.name}</span></h2>

        <div className="repo-actions">
          <button onClick={() => navigate(`/repo/edit/${repo._id}`)}>
            Edit
          </button>

          <button className="delete-btn" onClick={deleteRepo}>
            Delete
          </button>
        </div>

      </div>

      <p className="repo-description">{repo.description}</p>

      <div className="repo-stats">

        <span className={repo.visibility ? "public" : "private"}>
          {repo.visibility ? "Public" : "Private"}
        </span>

        <span>Issues: {repo.issues?.length}</span>

        <span>Created: {new Date(repo.createdAt).toLocaleDateString()}</span>

      </div>


      {/* Files Section */}

      <div className="repo-section">

        <h3>Files</h3>

        {repo.files?.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          <ul className="file-list">

            {repo.files.map((file, index) => (
              <li key={index}>

                📄 {file.filename}

                <span>
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </span>

              </li>
            ))}

          </ul>
        )}

      </div>


      {/* Content Section */}

      <div className="repo-section">

        <h3>Content</h3>

        {repo.content?.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

      </div>

    </div>
  );
};

export default RepoDetails;