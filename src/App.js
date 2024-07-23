import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const taskStorageKey = "storedTasks";
  const storedTasks = JSON.parse(localStorage.getItem(taskStorageKey));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [deadline, setDeadline] = useState(''); 
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState(storedTasks ? storedTasks : []);
  const inputRef = useRef(null);

  const updateTasks = (updatedTasks) => {
    localStorage.setItem(taskStorageKey, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  const updateForm = (task) => {
    setTitle(task?.title ? task.title : "");
    setDescription(task?.description ? task.description : "");
    setDeadline(task?.deadline ? task.deadline : "");
  } 

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedTasks = [];

    if (editIndex !== null) {
      // правим существующую задачу
      updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { title, description, deadline } : task
      );
      setEditIndex(null);
    } else {
      // добавляем новую задачу
      updatedTasks = [...tasks, { title, description, deadline, completed: false }];
    }
    updateTasks(updatedTasks);
    updateForm();
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTasks(updatedTasks);
  }

  const handleEdit = (index) => {
    inputRef.current.focus();
    updateForm(tasks[index]);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
    console.log("n");
  };

  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    updateTasks(sortedTasks);
  };

  const handleSortByCompletion = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
    updateTasks(sortedTasks);
    console.log(sortedTasks);
  };

  return (
    <div className="container">
      <h1 className="title">Список задач</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Заголовок"
          ref={inputRef}
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
        <button className="button-main button-save" type="submit">
          {editIndex !== null ? "Сохранить" : "Добавить задачу"}
        </button>
      </form>
      
      {/* <button className="button-main button-sort" onClick={handleSortByDate}>Все</button>
      <button className="button-main button-sort" onClick={handleSortByDate}>Завершенные</button>
      <button className="button-main button-sort" onClick={handleSortByDate}>Незавершенные</button> */}

      <button className="button-sort" onClick={handleSortByCompletion}>
        Сортировать по завершенности
      </button>

      <button className="button-main button-sort-date" onClick={handleSortByDate}>
        Сортировать по дате
      </button>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              <p className="list-text list-text_bold">{task.title}</p>
              <p className="list-text">{task.description}</p>
              <p className="list-text list-text_data">Срок: {task.deadline}</p>
            </span>
            <div>
              <button className="button-complete" onClick={() => handleComplete(index)}>
               {task.completed ? "Восстановить" : "Завершить"}
              </button>  
              <button className="button-edit" onClick={() => handleEdit(index)}></button>
              <button className="button-delete" onClick={() => handleDelete(index)}></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  };

export default App;
