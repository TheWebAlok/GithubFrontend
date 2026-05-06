import React, { useState, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const handleCreateRepo = async (e) => {
    e.preventDefault();
    if (!repositoryName.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("repositoryName", repositoryName);
      formData.append("description", description);
      formData.append("visibility", visibility);
      formData.append("userId", userId);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      await axios.post(
        "https://github-backend-clone.onrender.com/repo/create",
        formData
      );

      toast.success("Repository created successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      toast.error("Error creating repository. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const clearFiles = (e) => {
    e.stopPropagation();
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFolderCount = () => {
    const dirs = new Set();
    files.forEach((f) => {
      const p = f.webkitRelativePath || f.name;
      if (p.includes("/")) dirs.add(p.split("/")[0]);
    });
    return dirs.size;
  };

  const getInitCode = () =>
    `echo "# ${repositoryName}" >> README.md\ngit init\ngit add README.md\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin https://github.com/${userId}/${repositoryName}.git\ngit push -u origin main`;

  const getPushCode = () =>
    `git remote add origin https://github.com/${userId}/${repositoryName}.git\ngit branch -M main\ngit push -u origin main`;

  const copyToClipboard = (text, btnId) => {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.textContent = "✓ Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      }
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" theme="dark" />

      <div className="cr-page">
        {/* ── Page Header ── */}
        <div className="cr-header">
          <div className="cr-breadcrumb">
            <span className="cr-breadcrumb-link">{userId}</span>
            <span className="cr-breadcrumb-sep">›</span>
            <span>New repository</span>
          </div>
          <h1 className="cr-title">Create a new repository</h1>
          <p className="cr-subtitle">
            A repository contains all project files, including the revision
            history.
          </p>
        </div>

        {/* ── Mobile Tips Toggle ── */}
        <button
          className="cr-tips-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-expanded={sidebarOpen}
        >
          <span>💡 Tips &amp; guidelines</span>
          <svg
            className={`cr-chevron ${sidebarOpen ? "open" : ""}`}
            viewBox="0 0 16 16"
            fill="currentColor"
            width="14"
            height="14"
          >
            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
          </svg>
        </button>

        <div className="cr-grid">
          {/* ── Main Form ── */}
          <div className="cr-form-col">
            <form className="cr-form-card" onSubmit={handleCreateRepo}>
              <div className="cr-form-card-header">
                <h2>Repository details</h2>
              </div>

              <div className="cr-form-body">
                {/* Repo Name */}
                <div className="cr-field">
                  <label className="cr-label">
                    Repository name{" "}
                    <span className="cr-required">*</span>
                  </label>
                  <div className="cr-repo-name-row">
                    <div className="cr-owner-chip">
                      <span className="cr-avatar-sm">
                        {userId ? userId[0].toUpperCase() : "U"}
                      </span>
                      <span className="cr-owner-label">{userId}</span>
                    </div>
                    <span className="cr-slash">/</span>
                    <input
                      className="cr-repo-input"
                      type="text"
                      placeholder="my-awesome-project"
                      value={repositoryName}
                      onChange={(e) => setRepositoryName(e.target.value)}
                      autoComplete="off"
                      spellCheck="false"
                      required
                    />
                  </div>
                  <span className="cr-hint">
                    Great names are short, memorable, and lowercase with hyphens.
                  </span>
                </div>

                <hr className="cr-divider" />

                {/* Description */}
                <div className="cr-field">
                  <label className="cr-label">
                    Description{" "}
                    <span className="cr-optional">optional</span>
                  </label>
                  <textarea
                    className="cr-textarea"
                    placeholder="A short description of what this repository is for..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <hr className="cr-divider" />

                {/* Visibility */}
                <div className="cr-field">
                  <label className="cr-label">Visibility</label>
                  <div className="cr-vis-opts">
                    {[
                      {
                        val: "public",
                        icon: (
                          <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                          </svg>
                        ),
                        title: "Public",
                        desc: "Anyone on the internet can see this repository. You choose who can commit.",
                      },
                      {
                        val: "private",
                        icon: (
                          <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                            <path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 0 0-5 0v2Z" />
                          </svg>
                        ),
                        title: "Private",
                        desc: "You choose who can see and commit to this repository.",
                      },
                    ].map(({ val, icon, title, desc }) => (
                      <div
                        key={val}
                        className={`cr-vis-opt ${visibility === val ? "selected" : ""}`}
                        onClick={() => setVisibility(val)}
                        role="radio"
                        aria-checked={visibility === val}
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setVisibility(val)
                        }
                      >
                        <div className="cr-radio">
                          {visibility === val && (
                            <div className="cr-radio-dot" />
                          )}
                        </div>
                        <div className="cr-vis-icon">{icon}</div>
                        <div className="cr-vis-content">
                          <div className="cr-vis-title">{title}</div>
                          <div className="cr-vis-desc">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="cr-divider" />

                {/* File Upload */}
                <div className="cr-field">
                  <label className="cr-label">
                    Upload project folder{" "}
                    <span className="cr-optional">optional</span>
                  </label>
                  <div
                    className={`cr-drop-zone ${files.length > 0 ? "has-files" : ""} ${dragOver ? "drag-over" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload files"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      webkitdirectory="true"
                      multiple
                      onChange={handleFileChange}
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "none" }}
                    />

                    {files.length === 0 ? (
                      <>
                        <svg
                          className="cr-drop-icon"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Zm-1-5.47v-.75a.75.75 0 0 1 .22-.53l4.25-4.26a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1-1.06 1.06L8.75 6.31v5.44a.75.75 0 0 1-1.5 0V6.31L4.53 8.53a.75.75 0 0 1-1.06-1.06l.28-.94Z" />
                        </svg>
                        <div className="cr-drop-text">
                          <strong>Browse files</strong> or drag &amp; drop your
                          folder here
                        </div>
                        <div className="cr-drop-sub">
                          Any folder structure — all files will be preserved
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="cr-files-ready-icon">✓</div>
                        <div className="cr-drop-text success">
                          {files.length} file{files.length !== 1 ? "s" : ""}{" "}
                          selected
                          {getFolderCount() > 0 &&
                            ` — ${getFolderCount()} folder${getFolderCount() !== 1 ? "s" : ""}`}
                        </div>
                        <div className="cr-drop-sub">
                          Click to change selection
                        </div>
                        <button
                          className="cr-clear-files"
                          onClick={clearFiles}
                          type="button"
                        >
                          Clear
                        </button>
                      </>
                    )}
                  </div>
                  <span className="cr-hint">
                    Files will be committed to the default branch on creation.
                    Files over 100 MB require Git LFS.
                  </span>
                </div>

                <hr className="cr-divider" />

                {/* Submit */}
                <div className="cr-submit-row">
                  <button
                    type="submit"
                    className={`cr-btn-primary ${loading ? "loading" : ""}`}
                    disabled={!repositoryName.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <span className="cr-spinner" />
                        Creating…
                      </>
                    ) : (
                      "Create repository"
                    )}
                  </button>
                  <button
                    type="button"
                    className="cr-btn-secondary"
                    onClick={() => navigate("/")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Setup */}
            {repositoryName && (
              <div className="cr-quick-setup">
                <div className="cr-qs-header">
                  <h3>Quick setup — if you've done this before</h3>
                  <span className="cr-qs-badge">HTTPS</span>
                </div>
                <div className="cr-qs-body">
                  <div className="cr-qs-section-label">
                    …or create a new repository on the command line
                  </div>
                  <div className="cr-code-block">
                    <button
                      id="copy-init"
                      className="cr-copy-btn"
                      type="button"
                      onClick={() => copyToClipboard(getInitCode(), "copy-init")}
                    >
                      Copy
                    </button>
                    <pre>{getInitCode()}</pre>
                  </div>

                  <div className="cr-qs-section-label">
                    …or push an existing repository from the command line
                  </div>
                  <div className="cr-code-block">
                    <button
                      id="copy-push"
                      className="cr-copy-btn"
                      type="button"
                      onClick={() => copyToClipboard(getPushCode(), "copy-push")}
                    >
                      Copy
                    </button>
                    <pre>{getPushCode()}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className={`cr-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="cr-tip-card">
              <div className="cr-tip-header">Naming tips</div>
              <div className="cr-tip-body">
                <div className="cr-tip-item">
                  <span className="cr-tip-check">✓</span>
                  Use lowercase with hyphens:{" "}
                  <code className="cr-inline-code">my-project</code>
                </div>
                <div className="cr-tip-item">
                  <span className="cr-tip-check">✓</span>
                  Keep it short &amp; descriptive — under 30 characters.
                </div>
                <div className="cr-tip-item">
                  <span className="cr-tip-cross">✗</span>
                  Avoid spaces, special characters, or starting with a number.
                </div>
              </div>
            </div>

            <div className="cr-tip-card">
              <div className="cr-tip-header">Visibility guide</div>
              <div className="cr-tip-body">
                <div className="cr-tip-item">
                  <span className="cr-tip-dot green">●</span>
                  <span>
                    <strong>Public</strong> — Open source, discoverable, great
                    for portfolios.
                  </span>
                </div>
                <div className="cr-tip-item">
                  <span className="cr-tip-dot red">●</span>
                  <span>
                    <strong>Private</strong> — Only you and invited collaborators
                    can access.
                  </span>
                </div>
              </div>
            </div>

            <div className="cr-tip-card">
              <div className="cr-tip-header">File upload</div>
              <div className="cr-tip-body">
                <div className="cr-tip-item">
                  <span>📁</span>
                  Select your entire project folder — subdirectories are
                  preserved.
                </div>
                <div className="cr-tip-item">
                  <span>⚠️</span>
                  Files over 100 MB need Git LFS.{" "}
                  <code className="cr-inline-code">.env</code> files are NOT
                  auto-ignored.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CreateRepo;