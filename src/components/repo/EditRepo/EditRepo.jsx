import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./EditRepo.css";
import Navbar from "../../Navbar/Navbar";

const EditRepo = () => {

      const { id } = useParams();
      const navigate = useNavigate();

      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [content, setContent] = useState("");
      const [visibility, setVisibility] = useState(true);
      const [file, setFile] = useState(null);

      useEffect(() => {

            fetch(`https://github-backend-clone.onrender.com/repo/${id}`)
                  .then(res => res.json())
                  .then(data => {

                        setName(data.name || "");
                        setDescription(data.description || "");
                        setContent(data.content?.join("\n") || "");
                        setVisibility(data.visibility);

                  });

      }, [id]);

      const updateRepo = async (e) => {

            e.preventDefault();

            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("content", content);
            formData.append("visibility", visibility);

            if (file) {
                  formData.append("files", file); // FIX
            }

            try {

                  const res = await fetch(`https://github-backend-clone.onrender.com/repo/update/${id}`, {
                        method: "PUT",
                        body: formData
                  });

                  const data = await res.json();

                  if (!res.ok) {
                        throw new Error(data.message);
                  }

                  toast.success("Repository updated successfully");

                  setTimeout(() => {
                        navigate(`/repo/${id}`);
                  }, 1500);

            } catch (error) {

                  toast.error(error.message);

            }

      };

      return (
            <>
                  <Navbar />
                  <div className="edit-repo-container">

                        <ToastContainer />

                        <h2>Edit Repository</h2>

                        <form onSubmit={updateRepo} className="edit-form">

                              <label>Repository Name</label>

                              <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                              />

                              <label>Description</label>

                              <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                              />

                              <label>Content</label>

                              <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                              />

                              <label>Visibility</label>

                              <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value === "true")}
                              >
                                    <option value="true">Public</option>
                                    <option value="false">Private</option>
                              </select>

                              <label>Upload File</label>

                              <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                              />

                              <button type="submit">
                                    Update Repository
                              </button>

                        </form>

                  </div>
            </>
      );
};

export default EditRepo;