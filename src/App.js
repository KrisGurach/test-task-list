import React from "react";
import "./App.css";

const App = () => {
   return (
  <div className="container">
    <h1 className="title">Список задач</h1>
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Заголовок"
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Описание"
        required
      />
      <input
        className="input"
        type="date"
        required
      />
      <button className="button-save" type="submit">Сохранить</button>
    </form>
    <ul>
    </ul>
  </div>
   );
};

export default App;
