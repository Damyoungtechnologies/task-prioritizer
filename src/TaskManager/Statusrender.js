import "./Statusrender.css";
import Task from "./Task";

export default function Statusrender(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

  const tasksForStatus = tasks ? tasks.filter((task) => task.status === status) : [];

  return (
    <div className="statusLine">
      
      <h3>{status} <button onClick={() => addEmptyTask(status)} id="hideme" className="button addTask">
        +
      </button></h3>
      {tasksForStatus.map((task) => (
        <Task
          key={task.id}
          task={task}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
      <button onClick={() => addEmptyTask(status)} className="button addTask">
        +
      </button>
      
      
    </div>
  );
}
