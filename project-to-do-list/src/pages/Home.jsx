import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import TaskList from "../components/TaskList";
import TaskDetail from "../components/TaskDetail";
import initialData from "../data/db.json";
import "./Home.css";

export default function Home() {
  // Load tasks from localStorage or initial db.json
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todo_tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialData.tasks;
  });

  const [lists] = useState(initialData.lists);
  const [tags] = useState(initialData.tags);
  const [activeTab, setActiveTab] = useState("Today");
  const [selectedTaskId, setSelectedTaskId] = useState(3); // Default to Renew driver's license
  const [searchQuery, setSearchQuery] = useState("");

  // Persist tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle task selection
  const selectedTask =
    tasks.find((t) => t.id === selectedTaskId) || tasks[0] || null;

  // Filter tasks based on activeTab and searchQuery
  const filteredTasks = tasks.filter((task) => {
    // Search query filter
    if (searchQuery.trim()) {
      const matchQuery = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchQuery) return false;
    }

    // Tab / Category filter
    if (activeTab === "Today") {
      return true; // Show main list
    } else if (activeTab === "Upcoming") {
      return !task.completed;
    } else if (activeTab === "Calendar" || activeTab === "Sticky Wall") {
      return true;
    } else {
      // Filter by list name (Personal, Work, List 1)
      return task.list === activeTab;
    }
  });

  // Calculate task counts
  const taskCounts = {
    today: tasks.length,
    upcoming: tasks.filter((t) => !t.completed).length,
  };

  // Add task handler
  const handleAddTask = (title) => {
    const matchedList = lists.find((l) => l.name === activeTab);
    const newTask = {
      id: Date.now(),
      title: title,
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      list: matchedList ? matchedList.name : "Personal",
      listColor: matchedList ? matchedList.color : "#dc3545",
      completed: false,
      tags: ["Tag 1"],
      subtasks: [],
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    setSelectedTaskId(newTask.id);
  };

  // Toggle task complete handler
  const handleToggleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t,
    );
    setTasks(updatedTasks);
  };

  // Save edited task
  const handleSaveTask = (updatedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t,
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    if (selectedTaskId === taskId) {
      setSelectedTaskId(updatedTasks[0] ? updatedTasks[0].id : null);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <Row className="g-3 h-100">
          {/* Left Column: Sidebar */}
          <Col md={3} className="h-100">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              lists={lists}
              tags={tags}
              taskCounts={taskCounts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </Col>

          {/* Middle Column: Task List */}
          <Col md={5} className="h-100">
            <TaskList
              tasks={filteredTasks}
              activeTab={activeTab}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
              onToggleTaskComplete={handleToggleTaskComplete}
              onAddTask={handleAddTask}
            />
          </Col>

          {/* Right Column: Task Detail */}
          <Col md={4} className="h-100">
            <TaskDetail
              task={selectedTask}
              lists={lists}
              tags={tags}
              onSaveTask={handleSaveTask}
              onDeleteTask={handleDeleteTask}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
