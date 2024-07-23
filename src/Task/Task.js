import "./Task.css";

const Task = ({task, index, handleComplete, handleEdit, handleDelete}) => {
  return (
    <li key={index} className="task">
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        <p className="list-text list-text_bold">{task.title}</p>
        <p className="list-text">{task.description}</p>
        <p className="list-text list-text_data">Срок: {task.deadline}</p>
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
          onClick={() => handleDelete()}
        ></button>
      </div>
    </li>
  );
};

export default Task;
