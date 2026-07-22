import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  FaPlus,
  FaCalendarAlt,
  FaChevronRight,
  FaCheck
} from "react-icons/fa";

export default function TaskList({
  tasks,
  activeTab,
  selectedTaskId,
  onSelectTask,
  onToggleTaskComplete,
  onAddTask
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim());
    setNewTaskTitle("");
    setIsAdding(false);
  };

  return (
    <div className="task-column">
      {/* Header */}
      <div className="task-header">
        <h2>{activeTab}</h2>
        <span className="task-total-badge">{tasks.length}</span>
      </div>

      {/* Add New Task Button / Input */}
      {isAdding ? (
        <Form onSubmit={handleAddNewTask} className="mb-4">
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Task name..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
              className="form-control-custom"
            />
            <button type="submit" className="btn btn-yellow-save px-3">
              Add
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </Form>
      ) : (
        <div
          className="add-task-btn-box"
          onClick={() => setIsAdding(true)}
        >
          <FaPlus size={14} />
          <span>Add New Task</span>
        </div>
      )}

      {/* Task List Items */}
      <div className="task-items-container">
        {tasks.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p>No tasks found.</p>
          </div>
        ) : (
          tasks.map((task) => {
            const isSelected = selectedTaskId === task.id;
            return (
              <div
                key={task.id}
                className={`task-item-card ${isSelected ? "selected" : ""}`}
                onClick={() => onSelectTask(task.id)}
              >
                <div className="d-flex align-items-start gap-3 w-100 me-2">
                  {/* Custom Checkbox */}
                  <div
                    className={`custom-checkbox ${
                      task.completed ? "checked" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTaskComplete(task.id);
                    }}
                  >
                    {task.completed && <FaCheck size={10} />}
                  </div>

                  {/* Task Content */}
                  <div className="flex-grow-1">
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: task.completed ? "#a1a1aa" : "#18181b",
                        textDecoration: task.completed ? "line-through" : "none"
                      }}
                    >
                      {task.title}
                    </div>

                    {/* Metadata Pills */}
                    {(task.dueDate ||
                      (task.subtasks && task.subtasks.length > 0) ||
                      task.list) && (
                      <div className="task-meta-pills">
                        {task.dueDate && (
                          <span className="meta-pill">
                            <FaCalendarAlt size={11} color="#71717a" />
                            <span>{task.dueDate}</span>
                          </span>
                        )}

                        {task.subtasks && task.subtasks.length > 0 && (
                          <span className="meta-pill">
                            <span>{task.subtasks.length} Subtasks</span>
                          </span>
                        )}

                        {task.list && (
                          <span className="meta-pill">
                            <span
                              className="color-dot me-1"
                              style={{
                                backgroundColor: task.listColor || "#dc3545",
                                width: 8,
                                height: 8
                              }}
                            ></span>
                            <span>{task.list}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Arrow Icon */}
                <FaChevronRight
                  size={14}
                  color="#a1a1aa"
                  style={{ marginTop: 4 }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
