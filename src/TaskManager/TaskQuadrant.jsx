import React from "react";
import "./TaskQuadrant.css";

export default function TaskQuadrants({ tasks }) {
  // Categorizing tasks by urgency and importance
  const categorizedTasks = {
    U_I: [], // Urgent and Important
    NU_I: [], // Not Urgent and Important
    U_NI: [], // Urgent and Not Important
    NU_NI: [] // Not Urgent and Not Important
  };

  tasks.forEach((task) => {
    if (categorizedTasks[task.urgency]) {
      categorizedTasks[task.urgency].push(task.title);
    }
  });

  return (
    <div className="quadrant-container">
      <div className="quadrants">
        {["U_I", "NU_I", "U_NI", "NU_NI"].map((key, index) => (
          <div className="quadrant" key={index}>
            <h3>
              <span className="un1">{key === "U_I" && "Urgent and Important(U_I)"}</span>
              <span className="un2">{key === "NU_I" && "Not Urgent and Important(NU_I)"}</span>
              <span className="un3">{key === "U_NI" && "Urgent and Not Important(U_NI)"}</span>
              <span className="un4">{key === "NU_NI" && "Not Urgent and Not Important(NU_NI)"}</span>
            </h3>
            <ol className={categorizedTasks[key].length > 0 ? "" : "no-tasks"}>
              {categorizedTasks[key].length > 0 ? (
                categorizedTasks[key].map((task, idx) => <li key={idx}>{task}</li>)
              ) : (
                <li>No task added</li>
              )}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
