import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Navbar/Navbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Sora', sans-serif;
    background: #0d1117;
    color: #e6edf3;
    min-height: 100vh;
  }

  .er-page {
    background: #0d1117;
    min-height: 100vh;
    padding-bottom: 60px;
  }

  /* ── Breadcrumb bar ── */
  .er-topbar {
    background: #161b22;
    border-bottom: 1px solid #21262d;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: #8b949e;
  }
  .er-topbar a {
    color: #58a6ff;
    text-decoration: none;
  }
  .er-topbar a:hover { text-decoration: underline; }
  .er-topbar .sep { color: #484f58; }

  /* ── Container ── */
  .er-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 32px 20px 0;
  }

  /* ── Page heading ── */
  .er-heading {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .er-heading-icon {
    width: 38px; height: 38px;
    background: rgba(56,139,253,0.12);
    border: 1px solid #1f6feb;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }
  .er-heading h1 {
    font-size: 18px;
    font-weight: 600;
    color: #e6edf3;
  }
  .er-heading p {
    font-size: 12px;
    color: #8b949e;
    margin-top: 2px;
  }

  /* ── Card wrapper ── */
  .er-card {
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 12px;
    overflow: hidden;
  }
  .er-card-header {
    padding: 14px 20px;
    border-bottom: 1px solid #21262d;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .er-card-header span {
    font-size: 12px;
    font-weight: 600;
    color: #8b949e;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* ── Form ── */
  .er-form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .er-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .er-label {
    font-size: 12px;
    font-weight: 600;
    color: #8b949e;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .er-label-required {
    color: #f85149;
    font-size: 14px;
    line-height: 1;
  }
  .er-hint {
    font-size: 11px;
    color: #484f58;
    margin-top: 2px;
  }

  /* ── Inputs ── */
  .er-input,
  .er-textarea,
  .er-select {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    color: #e6edf3;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
  }
  .er-input {
    padding: 9px 12px;
    height: 38px;
    font-family: 'JetBrains Mono', monospace;
  }
  .er-input:focus,
  .er-textarea:focus,
  .er-select:focus {
    border-color: #388bfd;
    box-shadow: 0 0 0 3px rgba(56,139,253,0.15);
  }
  .er-input::placeholder,
  .er-textarea::placeholder { color: #484f58; }

  .er-textarea {
    padding: 10px 12px;
    resize: vertical;
    line-height: 1.6;
    min-height: 80px;
  }
  .er-textarea.code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    min-height: 120px;
    color: #7ee787;
  }

  .er-select {
    padding: 9px 12px;
    height: 38px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23484f58' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }
  .er-select option { background: #161b22; }

  /* ── Visibility toggle ── */
  .er-vis-group {
    display: flex;
    gap: 10px;
  }
  .er-vis-option {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.12s;
  }
  .er-vis-option.selected.pub  { border-color: #238636; background: rgba(35,134,54,0.08); }
  .er-vis-option.selected.priv { border-color: #9e6a03; background: rgba(158,106,3,0.08); }
  .er-vis-option:hover:not(.selected) { border-color: #484f58; }
  .er-vis-radio { display: none; }
  .er-vis-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 2px solid #484f58;
    flex-shrink: 0;
    transition: border-color 0.15s, background 0.15s;
  }
  .er-vis-option.selected.pub  .er-vis-dot { border-color: #3fb950; background: #3fb950; }
  .er-vis-option.selected.priv .er-vis-dot { border-color: #f0883e; background: #f0883e; }
  .er-vis-text strong {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #e6edf3;
  }
  .er-vis-text small { font-size: 11px; color: #484f58; }

  /* ── File upload ── */
  .er-file-area {
    background: #0d1117;
    border: 1.5px dashed #30363d;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s, background 0.12s;
    position: relative;
  }
  .er-file-area:hover { border-color: #388bfd; background: rgba(56,139,253,0.04); }
  .er-file-area.has-file { border-color: #238636; background: rgba(35,134,54,0.06); border-style: solid; }
  .er-file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  .er-file-icon { font-size: 22px; margin-bottom: 6px; }
  .er-file-label { font-size: 12px; color: #8b949e; }
  .er-file-label strong { color: #58a6ff; }
  .er-file-name {
    font-size: 12px;
    color: #3fb950;
    font-family: 'JetBrains Mono', monospace;
    margin-top: 4px;
  }
  .er-file-clear {
    position: absolute;
    top: 8px; right: 10px;
    background: none;
    border: none;
    color: #484f58;
    font-size: 16px;
    cursor: pointer;
    line-height: 1;
    z-index: 2;
  }
  .er-file-clear:hover { color: #f85149; }

  /* ── Divider ── */
  .er-divider {
    height: 1px;
    background: #21262d;
    margin: 0 -20px;
  }

  /* ── Action row ── */
  .er-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid #21262d;
    background: #161b22;
  }
  .er-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    border: 1px solid;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .er-btn-cancel {
    background: transparent;
    border-color: #30363d;
    color: #8b949e;
  }
  .er-btn-cancel:hover { background: #21262d; color: #e6edf3; }
  .er-btn-save {
    background: #238636;
    border-color: #2ea043;
    color: #fff;
  }
  .er-btn-save:hover:not(:disabled) { background: #2ea043; }
  .er-btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .er-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Skeleton ── */
  .er-skeleton .er-form { opacity: 0.5; pointer-events: none; }
  .skel {
    background: linear-gradient(90deg, #21262d 25%, #2d333b 50%, #21262d 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .er-container { padding: 20px 12px 0; }
    .er-form { padding: 16px; gap: 16px; }
    .er-actions { padding: 12px 16px; }
    .er-vis-group { flex-direction: column; }
    .er-btn { flex: 1; justify-content: center; }
    .er-heading h1 { font-size: 16px; }
  }
`;

const EditRepo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName]               = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent]         = useState("");
  const [visibility, setVisibility]   = useState(true);
  const [file, setFile]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);

  useEffect(() => {
    fetch(`https://github-backend-clone.onrender.com/repo/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setDescription(data.description || "");
        setContent(data.content?.join("\n") || "");
        setVisibility(data.visibility ?? true);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load repository");
        setLoading(false);
      });
  }, [id]);

  const updateRepo = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Repository name is required"); return; }

    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("visibility", visibility);
    if (file) formData.append("files", file);

    try {
      const res = await fetch(`https://github-backend-clone.onrender.com/repo/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Repository updated successfully");
      setTimeout(() => navigate(`/repo/${id}`), 1500);
    } catch (err) {
      toast.error(err.message || "Update failed");
      setSaving(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="er-page">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastStyle={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        />

        {/* Breadcrumb */}
        <div className="er-topbar">
          <a href="/" onClick={e => { e.preventDefault(); navigate("/"); }}>home</a>
          <span className="sep">/</span>
          <a href={`/repo/${id}`} onClick={e => { e.preventDefault(); navigate(`/repo/${id}`); }}>
            {name || id}
          </a>
          <span className="sep">/</span>
          <span style={{ color: "#e6edf3" }}>edit</span>
        </div>

        <div className="er-container">
          {/* Heading */}
          <div className="er-heading">
            {/* <div className="er-heading-icon"><i class="bi bi-pen"></i></div> */}
            <div>
              <h1>Edit Repository</h1>
              <p>Update your repository details and files</p>
            </div>
          </div>

          {/* Form card */}
          <div className={`er-card ${loading ? "er-skeleton" : ""}`}>
            <div className="er-card-header">
              {/* <span style={{ fontSize: 12 }}><i class="bi bi-gear"></i></span> */}
              <span>Repository Settings</span>
            </div>

            <form onSubmit={updateRepo} className="er-form">

              {/* Name */}
              <div className="er-field">
                <label className="er-label">
                  Repository Name
                  <span className="er-label-required">*</span>
                </label>
                {loading ? (
                  <div className="skel" style={{ height: 38 }} />
                ) : (
                  <input
                    className="er-input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="my-awesome-project"
                    required
                  />
                )}
              </div>

              {/* Description */}
              <div className="er-field">
                <label className="er-label">Description</label>
                <span className="er-hint">A short description of what this repository does</span>
                {loading ? (
                  <div className="skel" style={{ height: 68 }} />
                ) : (
                  <textarea
                    className="er-textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="A blazing-fast web app built with React…"
                    rows={3}
                  />
                )}
              </div>

              {/* Content */}
              <div className="er-field">
                <label className="er-label">Content</label>
                <span className="er-hint">Each line will be stored as a separate content entry</span>
                {loading ? (
                  <div className="skel" style={{ height: 100 }} />
                ) : (
                  <textarea
                    className="er-textarea code"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder={"// Add your content here\n// Each line = one entry"}
                    rows={5}
                  />
                )}
              </div>

              {/* Visibility */}
              <div className="er-field">
                <label className="er-label">Visibility</label>
                <div className="er-vis-group">
                  <label
                    className={`er-vis-option ${visibility ? "selected pub" : ""}`}
                    onClick={() => setVisibility(true)}
                  >
                    <div className="er-vis-dot" />
                    <div className="er-vis-text">
                      <strong>🌐 Public</strong>
                      <small>Anyone can see this repository</small>
                    </div>
                  </label>
                  <label
                    className={`er-vis-option ${!visibility ? "selected priv" : ""}`}
                    onClick={() => setVisibility(false)}
                  >
                    <div className="er-vis-dot" />
                    <div className="er-vis-text">
                      <strong>🔒 Private</strong>
                      <small>Only you can see this repository</small>
                    </div>
                  </label>
                </div>
              </div>

              {/* File upload */}
              <div className="er-field">
                <label className="er-label">Upload File</label>
                <span className="er-hint">Attach a new file to this repository</span>
                <div className={`er-file-area ${file ? "has-file" : ""}`}>
                  <input
                    className="er-file-input"
                    type="file"
                    onChange={e => setFile(e.target.files[0] || null)}
                  />
                  {file && (
                    <button
                      type="button"
                      className="er-file-clear"
                      onClick={e => { e.stopPropagation(); setFile(null); }}
                      title="Remove file"
                    >×</button>
                  )}
                  <div className="er-file-icon">{file ? "📄" : "📁"}</div>
                  {file ? (
                    <div className="er-file-name">{file.name}</div>
                  ) : (
                    <div className="er-file-label">
                      <strong>Choose a file</strong> or drag it here
                    </div>
                  )}
                </div>
              </div>

            </form>

            {/* Actions */}
            <div className="er-actions">
              <button
                type="button"
                className="er-btn er-btn-cancel"
                onClick={() => navigate(`/repo/${id}`)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="er-btn er-btn-save"
                onClick={updateRepo}
                disabled={saving || loading}
              >
                {saving ? (
                  <><span className="er-spinner" /> Saving…</>
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EditRepo;