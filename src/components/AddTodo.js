import react, { useState } from 'react';
import './AddTodo.css';
import Sun from '../assests/images/icon-sun.svg';
import Check from '../assests/images/icon-check.svg';

const AddTodo = (props) => {

  const [completedTodo, setCompletedTodo] = useState(false)

  let containerTheme, radioBackground, radioTheme, textTheme;

  if (props.theme === Sun) {
    containerTheme = "dark-container"
    radioTheme = "dark-check-div"
    textTheme = "white-text"
  } else {
    containerTheme = "light-container"
    radioTheme = "light-check-div"
    textTheme = "light-themed-text"
  }

  if (completedTodo) {
    radioBackground = "check-clicked"
  } else {
    radioBackground = ""
  }

  const handleCompletedTodo = () => {
    completedTodo ? setCompletedTodo(false) : setCompletedTodo(true)
  }

  const handleKeyPress = (event) => {
      if(event.key === 'Enter' && event.target.value.length > 0) {

        let newTodo = {
            order: "",
            title: new Date().toDateString(),
            body: event.target.value,
            status: completedTodo ? "completed" : "active"
        }

        event.target.value = "";
        props.newTodoCallback(newTodo);
      }
  }

  return (
    <div className={containerTheme + " new-container padding-10 margin-10 new-row width-600"}>
        <div className={radioBackground + " " + radioTheme + " check-div pointer"} onClick={handleCompletedTodo}>
            {completedTodo && <img src={Check} className="check" alt="check"/>}
        </div>
        <input onKeyPress={handleKeyPress} className={textTheme + " width-500"} placeholder="Create a new todo..."/>
    </div>
  );
}

export default AddTodo;
