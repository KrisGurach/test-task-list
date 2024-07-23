import "./Task.css";

const Task = ({removingIndex, task, index, handleComplete, handleEdit, handleDelete}) => {
  return (
    <li key={index} className={`task ${removingIndex === index ? 'task-leave' : ''}`}>
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        <p className="task-text list-text_bold">{task.title}</p>
        <p className="task-text">{task.description}</p>
        <p className="task-text task-text_data">Срок: {task.deadline}</p>
      </span>
      <div>
        <button
          className="button-main button-complete"
          onClick={() => handleComplete(index)}
        >
          {task.completed ? "Восстановить" : "Завершить"}
        </button>
        <button
          className="button-edit"
          onClick={() => handleEdit(index)}
        ></button>
        <button
          className="button-delete"
          onClick={() => handleDelete(index)}
        ></button>
      </div>
    </li>
  );
};

export default Task;
