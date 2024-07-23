import React, { useRef, useState } from "react";
import "./App.css";
import Task from "../Task/Task";

const App = () => {
  const taskStorageKey = "storedTasks";
  const storedTasks = JSON.parse(localStorage.getItem(taskStorageKey));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [deadline, setDeadline] = useState(''); 
  const [editIndex, setEditIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);
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
    setRemovingIndex(index);

    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setRemovingIndex(null);
      updateTasks(updatedTasks);
    }, 300);
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

      <button
        className="button-main button-sort"
        onClick={handleSortByCompletion}
      >
        Сортировать по статусу
      </button>

      <button className="button-main button-sort" onClick={handleSortByDate}>
        Сортировать по дате
      </button>

      <ul className="task-list">
        {tasks.map((task, index) => {
          return <Task
            removingIndex={removingIndex}
            key={index}
            task={task} 
            index={index}
            handleComplete={handleComplete}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />;
        })}
      </ul>
    </div>
  );
  };

export default App;
