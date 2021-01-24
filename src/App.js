import react, { useState } from 'react';
import './App.css';
import Sun from './assests/images/icon-sun.svg';
import Moon from './assests/images/icon-moon.svg';
import AddTodo from './components/AddTodo';
import DisplayTodo from './components/DisplayTodo';

/**
 * if signed in post new Todo
 * if not save in the created array
 * 
 * if not signed in send created array to display todo or send the objects from the get method
 */

const App = () => {

  const [colorTheme, setColorTheme] = useState(Sun);
  const [todoArray, setTodoArray] = useState([]);

  let outerDivTheme, buttonTheme, mainTheme, footerTheme;

  if (colorTheme === Sun) {
    outerDivTheme = "dark"
    buttonTheme = "button-dark"
    mainTheme = "main-dark"
    footerTheme = "dark-text"
  } else {
    outerDivTheme = "light"
    buttonTheme = "button-light"
    mainTheme = "main-light"
    footerTheme = "light-text"
  }

  const handleTheme = () => {
    colorTheme === Sun ? setColorTheme(Moon) : setColorTheme(Sun)
  }

  const handleNewTodo = (newTodo) => {
    newTodo.order = todoArray.length
    setTodoArray([...todoArray, newTodo])
  }

  const handleUpdatedTodos = (updated) => {
    
    updated.sort((a, b) => {
      return a.order - b.order
    })

    setTodoArray(updated)
  }

  return (
    <div className={outerDivTheme + " background container"}>
      <nav>
        <button className={buttonTheme + " float-right"}>Sign in with Google</button>
      </nav>
      <div className={mainTheme + " main"}>
        <header className="row width-600">
          <h1>NOTED</h1>
          <img src={colorTheme} onClick={handleTheme} className="pointer" alt="colorTheme"/>
        </header>

        <AddTodo theme={colorTheme} newTodoCallback={(newTodo) => handleNewTodo(newTodo)}/>

        <DisplayTodo theme={colorTheme} displayTodos={todoArray} updatedTodoCallback={(updated) => handleUpdatedTodos(updated)}/>

        <footer className={footerTheme + " row width-600"}>
          <small>Drag and drop to reorder list</small>
          <small className="not-allowed">All My todos</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
