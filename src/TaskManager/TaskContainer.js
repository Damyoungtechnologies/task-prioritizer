import { useState, useEffect } from "react";
import "./TaskContainer.css";
import Statusrender from "./Statusrender";
import TaskQuadrant from "./TaskQuadrant"; // Import TaskQuadrant for auto-updating

function TaskContainer() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const newTaskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: newTaskId, title: "", description: "", urgency: "", status }]);
  }

  function addTask(taskToAdd) {
    const updatedTasks = tasks.filter((task) => task.id !== taskToAdd.id);
    setTasks([...updatedTasks, taskToAdd]);
    saveTasksToLocalStorage([...updatedTasks, taskToAdd]);
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  }

  function moveTask(id, newStatus) {
    const task = tasks.find((task) => task.id === id);
    task.status = newStatus;
    setTasks([...tasks.filter((t) => t.id !== id), task]);
    saveTasksToLocalStorage([...tasks.filter((t) => t.id !== id), task]);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(loadedTasks);
  }
 

  return (
    <div className="myTask">
      <TaskQuadrant tasks={tasks} />
      <div className="task-controller">
        <Statusrender
          tasks={tasks}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Backlog"
        />
        <Statusrender
          tasks={tasks}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="In Progress"
        />
        <Statusrender
          tasks={tasks}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Done"
        />
      </div>
    </div>
  );
}

export default TaskContainer;
