import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";

export default function TaskDetail({
  task,
  lists,
  tags,
  onSaveTask,
  onDeleteTask
}) {
  const [editedTask, setEditedTask] = useState(task);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) {
    return (
      <div className="detail-column justify-content-center align-items-center text-muted">
        <p>Select a task to view details</p>
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    setEditedTask({
      ...editedTask,
      [field]: value
    });
  };

  const handleListChange = (listName) => {
    const matchedList = lists.find((l) => l.name === listName);
    setEditedTask({
      ...editedTask,
      list: listName,
      listColor: matchedList ? matchedList.color : "#dc3545"
    });
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSubtask = {
      id: Date.now(),
      title: newSubtaskTitle.trim(),
      completed: false
    };
    const updatedSubtasks = [...(editedTask.subtasks || []), newSubtask];
    setEditedTask({
      ...editedTask,
      subtasks: updatedSubtasks
    });
    setNewSubtaskTitle("");
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = (editedTask.subtasks || []).map((sub) =>
      sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
    );
    setEditedTask({
      ...editedTask,
      subtasks: updatedSubtasks
    });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = (editedTask.subtasks || []).filter(
      (sub) => sub.id !== subtaskId
    );
    setEditedTask({
      ...editedTask,
      subtasks: updatedSubtasks
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTask(editedTask);
  };

  return (
    <div className="detail-column">
      <Form onSubmit={handleSubmit} className="d-flex flex-column h-100">
        <div>
          <div className="detail-header-title">Task:</div>

          {/* Title Input */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={editedTask.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="form-control-custom fw-semibold"
              placeholder="Task name"
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={3}
              value={editedTask.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="form-control-custom text-muted"
              placeholder="Description"
              style={{ resize: "none" }}
            />
          </Form.Group>

          {/* List Dropdown */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="text-muted fw-semibold" style={{ fontSize: "0.9rem" }}>
              List
            </span>
            <Form.Select
              size="sm"
              value={editedTask.list || ""}
              onChange={(e) => handleListChange(e.target.value)}
              style={{ width: "140px", borderRadius: "8px" }}
            >
              {lists.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Due Date Input */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="text-muted fw-semibold" style={{ fontSize: "0.9rem" }}>
              Due date
            </span>
            <Form.Control
              type="date"
              size="sm"
              value={editedTask.dueDate || ""}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              style={{ width: "140px", borderRadius: "8px" }}
            />
          </div>

          {/* Tags */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="text-muted fw-semibold" style={{ fontSize: "0.9rem" }}>
              Tags
            </span>
            <div className="d-flex flex-wrap gap-1 align-items-center">
              {(editedTask.tags || []).map((t, idx) => (
                <span key={idx} className="tag-badge py-1 px-2 m-0" style={{ fontSize: "0.8rem" }}>
                  {t}
                </span>
              ))}
              <span className="tag-badge py-1 px-2 m-0 text-muted" style={{ fontSize: "0.8rem", backgroundColor: "#ffffff" }}>
                + Add Tag
              </span>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="mt-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: "1.1rem" }}>
              Subtasks:
            </h5>

            {/* Add Subtask Input */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <Form.Control
                type="text"
                size="sm"
                placeholder="+ Add New Subtask"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubtask(e);
                  }
                }}
                className="form-control-custom"
                style={{ fontSize: "0.85rem" }}
              />
            </div>

            {/* Subtasks List */}
            <div className="subtasks-list" style={{ maxHeight: "160px", overflowY: "auto" }}>
              {(editedTask.subtasks || []).map((subtask) => (
                <div
                  key={subtask.id}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className={`custom-checkbox ${
                        subtask.completed ? "checked" : ""
                      }`}
                      style={{ width: 16, height: 16 }}
                      onClick={() => handleToggleSubtask(subtask.id)}
                    >
                      {subtask.completed && <FaCheck size={8} />}
                    </div>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        textDecoration: subtask.completed ? "line-through" : "none",
                        color: subtask.completed ? "#a1a1aa" : "#27272a"
                      }}
                    >
                      {subtask.title}
                    </span>
                  </div>
                  <FaTrash
                    size={12}
                    color="#a1a1aa"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteSubtask(subtask.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="d-flex justify-content-between align-items-center pt-4 mt-auto">
          <button
            type="button"
            className="btn btn-delete-task"
            onClick={() => onDeleteTask(editedTask.id)}
          >
            Delete Task
          </button>
          <button type="submit" className="btn btn-yellow-save">
            Save changes
          </button>
        </div>
      </Form>
    </div>
  );
}
