import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [deadline, setDeadline] = useState(''); 
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
            index === editIndex ? { title, description, deadline } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
    } else {
        setTasks([...tasks, { title, description, deadline }]);
    }
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <div className="container">
      <h1 className="title">Список задач</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button className="button-save" type="submit">
          {editIndex !== null ? "Сохранить" : "Добавить задачу"}
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task">
            <span>
              <p className="list-text list-text_bold">{task.title}</p>
              <p className="list-text">{task.description}</p>
              <p className="list-text list-text_data">Срок: {task.deadline}</p>
            </span>
            <div>
              <button className="button-edit"></button>
              <button className="button-delete"></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  };

export default App;
