import React from "react";
import "./App.css";

const App = () => {
   return (
  <div className="container">
    <h1>Список задач</h1>
    <form>
      <input
        type="text"
        placeholder="Заголовок"
        required
      />
      <input
        type="text"
        placeholder="Описание"
        required
      />
      <input
        type="date"
        required
      />
      <button type="submit">Сохранить</button>
    </form>
    <ul>
    </ul>
  </div>
   );
};

export default App;
