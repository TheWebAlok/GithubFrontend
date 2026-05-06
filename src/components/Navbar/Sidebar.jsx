import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({open,setOpen}) => {
  return (

    <div className={open ? "sidebar active" : "sidebar"}>

      <div className="sidebar-header">
        <h3>Dashboard</h3>
        <span style={{cursor:"pointer"}} onClick={()=>setOpen(false)}>✕</span>
      </div>

      <ul>

  <li><Link to="/dashboard">🏠 Home</Link></li>
  <li><Link to="/issues">⚪ Issues</Link></li>
  <li><Link to="/pull">🔀 Pull requests</Link></li>
  <li><Link to="/repo">📁 Repositories</Link></li>

  <li>📊 Projects</li>
  <li>💬 Discussions</li>
  <li>💻 Codespaces</li>
  <li>🤖 Copilot</li>

  <hr/>

  <li>🔭 Explore</li>
  <li>🛒 Marketplace</li>

</ul>

    </div>
  );
};

export default Sidebar;