import React from "react";
import { Form } from "react-bootstrap";
import {
  FaBars,
  FaAngleDoubleRight,
  FaCalendarAlt,
  FaStickyNote,
  FaPlus,
  FaSlidersH,
  FaSignOutAlt,
  FaCheckSquare,
} from "react-icons/fa";

export default function Sidebar({
  activeTab,
  setActiveTab,
  lists,
  tags,
  taskCounts,
  onSearchChange,
  searchQuery,
}) {
  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <h3>Menu</h3>
        <FaBars size={20} style={{ cursor: "pointer", color: "#52525b" }} />
      </div>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Q Search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-box"
      />

      {/* TASKS Section */}
      <div className="sidebar-section-title">TASKS</div>

      <div
        className={`sidebar-nav-item ${activeTab === "Upcoming" ? "active" : ""}`}
        onClick={() => setActiveTab("Upcoming")}
      >
        <div className="d-flex align-items-center gap-2">
          <FaAngleDoubleRight size={14} color="#71717a" />
          <span>Upcoming</span>
        </div>
        <span className="sidebar-count-badge">12</span>
      </div>

      <div
        className={`sidebar-nav-item ${activeTab === "Today" ? "active" : ""}`}
        onClick={() => setActiveTab("Today")}
      >
        <div className="d-flex align-items-center gap-2">
          <FaCheckSquare size={14} color="#71717a" />
          <span>Today</span>
        </div>
        <span className="sidebar-count-badge">{taskCounts.today || 5}</span>
      </div>

      <div
        className={`sidebar-nav-item ${activeTab === "Calendar" ? "active" : ""}`}
        onClick={() => setActiveTab("Calendar")}
      >
        <div className="d-flex align-items-center gap-2">
          <FaCalendarAlt size={14} color="#71717a" />
          <span>Calendar</span>
        </div>
      </div>

      {/* LISTS Section */}
      <div className="sidebar-section-title">LISTS</div>
      {lists.map((list) => (
        <div
          key={list.id}
          className={`sidebar-nav-item ${activeTab === list.name ? "active" : ""}`}
          onClick={() => setActiveTab(list.name)}
        >
          <div className="d-flex align-items-center">
            <span
              className="color-dot"
              style={{ backgroundColor: list.color }}
            ></span>
            <span>{list.name}</span>
          </div>
          <span className="sidebar-count-badge">{list.count}</span>
        </div>
      ))}
      <div
        className="sidebar-nav-item text-muted"
        style={{ fontSize: "0.85rem", fontStyle: "normal" }}
      >
        <div className="d-flex align-items-center gap-2">
          <FaPlus size={12} />
          <span>Add New List</span>
        </div>
      </div>

      {/* TAGS Section */}
      <div className="sidebar-section-title">TAGS</div>
      <div className="d-flex flex-wrap align-items-center">
        {tags.map((tag) => (
          <span key={tag.id} className="tag-badge">
            {tag.name}
          </span>
        ))}
        <span className="tag-badge" style={{ backgroundColor: "#f4f4f5" }}>
          <FaPlus size={10} className="me-1" /> Add Tag
        </span>
      </div>

      {/* Footer */}
      {/* <div className="sidebar-footer">
        <div className="sidebar-nav-item py-1">
          <div className="d-flex align-items-center gap-2">
            <FaSlidersH size={14} />
            <span>Settings</span>
          </div>
        </div>
        <div className="sidebar-nav-item py-1">
          <div className="d-flex align-items-center gap-2">
            <FaSignOutAlt size={14} />
            <span>Sign out</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
