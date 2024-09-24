import "./Task.css";
import { useState } from "react";

export default function Task(props) {
  const { addTask, deleteTask, moveTask } = props;
  const task = props.task || {};

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency || "");
  const [collapsed, setCollapsed] = useState(task.isCollapsed || false);
  const [formAction, setFormAction] = useState("");
  const [isUrgencySelected, setIsUrgencySelected] = useState(true);
  const [hidden, setHidden] = useState(false); // New state to manage task visibility

  function handleUrgencySelection(event) {
    setUrgencyLevel(event.target.value);
    setIsUrgencySelected(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!urgencyLevel) {
      setIsUrgencySelected(false);
      return;
    }

    if (formAction === "save") {
      const updatedTask = {
        id: task.id || Date.now(),
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        urgency: urgencyLevel,
        status: task.status || "Backlog",
        isCollapsed: true,
      };

      addTask(updatedTask);
      setCollapsed(true); // Collapse after saving
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }

    // Toggle collapsed state for edit functionality
    if (formAction === "edit") {
      setCollapsed(false); // Expand for editing
    }
  }

  function handleMoveLeft() {
    const newStatus = task.status === "In Progress" ? "Backlog" : task.status === "Done" ? "In Progress" : "";
    if (newStatus) moveTask(task.id, newStatus);
  }

  function handleMoveRight() {
    const newStatus = task.status === "Backlog" ? "In Progress" : task.status === "In Progress" ? "Done" : "";
    if (newStatus) moveTask(task.id, newStatus);
  }

  // Function to hide the entire task div
  function handleHideTask() {
    setHidden(true); // Hide the task by setting hidden to true
  }

  if (hidden) {
    return null; // Do not render the task if it's hidden
  }

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
       {/* Close button to hide the task and also closes rendered null if the task is collapsed */}
       {(!collapsed) ? <button onClick={handleHideTask} id="relax" className="button delete">X</button> : null}
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          defaultValue={task.title || ""}
          disabled={collapsed}
          required
        />
        <textarea
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description || ""}
          required
        />
        <div className="urgencyLabels">
          <label className={`U_I ${urgencyLevel === "U_I" ? "selected" : ""}`} title="Urgent and Important">
            <input
              value="U_I"
              onChange={handleUrgencySelection}
              type="radio"
              name="urgency"
              disabled={collapsed} // Disable the radio when collapsed
            />
            U_I
          </label>
          <label className={`NU_I ${urgencyLevel === "NU_I" ? "selected" : ""}`} title="Not Urgent and Important">
            <input
              value="NU_I"
              onChange={handleUrgencySelection}
              type="radio"
              name="urgency"
              disabled={collapsed}
            />
            NU_I
          </label>
          <label className={`U_NI ${urgencyLevel === "U_NI" ? "selected" : ""}`} title="Urgent and Not Important">
            <input
              value="U_NI"
              onChange={handleUrgencySelection}
              type="radio"
              name="urgency"
              disabled={collapsed}
            />
            U_NI
          </label>
          <label className={`NU_NI ${urgencyLevel === "NU_NI" ? "selected" : ""}`} title="Not Urgent and Not Important">
            <input
              value="NU_NI"
              onChange={handleUrgencySelection}
              type="radio"
              name="urgency"
              disabled={collapsed}
            />
            NU_NI
          </label>
        </div>
        {!isUrgencySelected && <p className="error-message">Please select an urgency level before saving.</p>}
        <button onClick={() => setFormAction(collapsed ? "edit" : "save")} className="button">{collapsed ? "Edit" : "Save"}</button>
        {collapsed && <button onClick={() => setFormAction("delete")} className="button delete">X</button>}
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
}
