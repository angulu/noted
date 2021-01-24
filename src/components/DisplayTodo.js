import react, { useEffect, useState } from 'react';
import './AddTodo.css';
import Sun from '../assests/images/icon-sun.svg';
import Check from '../assests/images/icon-check.svg';

const DisplayTodo = (props) => {

  const { theme, displayTodos, updatedTodoCallback } = props

  let containerTheme, radioBackground, footerTheme, shadowTheme;

  if (theme === Sun) {
    containerTheme = "dark-container"
    footerTheme = "dark-text"
    shadowTheme = "dark-box-shadow"
  } else {
    containerTheme = "light-container"
    footerTheme = "light-text"
    shadowTheme = "light-box-shadow"
  }


  // update the todo's status
  const handleCompleted = (i) => {
    displayTodos.forEach((todo, index) => {
        if (index === i) {
            
            if (todo.status = "active") {
                todo.status = "completed"
            }
            else
                todo.status = "active"
        } 

        return todo
    })

    updatedTodoCallback(displayTodos)
    
  }

  const displayItems = displayTodos.map((todo, index) => {
    
    let radioTheme, borderTheme, canceledTheme, textTheme;

    if (theme === Sun) {
        radioTheme = "dark-check-div"
        borderTheme = "dark-todo"
        canceledTheme = "dark-text"
        textTheme = "white-text"
      } else {
        radioTheme = "light-check-div"
        borderTheme = "light-todo"
        canceledTheme = "light-canceled-text"
        textTheme = "light-themed-text"
      }

    if (todo.status === "completed") {
        radioBackground = "check-clicked"
    } else {
        radioBackground = ""
    }

   return (
      <div key={index} className={ borderTheme + " new-row padding-15"}>
         <div className={radioBackground + " " + radioTheme + " check-div pointer"} onClick={() => handleCompleted(index)}>
            {todo.status === "completed" && <img src={Check} className="check" alt="check"/>}
        </div>
        {todo.status === "completed" ? <del className={canceledTheme + " width-500"}>{todo.body}</del> : <span className={textTheme + " width-500"}>{todo.body}</span>}
      </div>
   )
  })

  const countActive = () => {
    let active = 0

    displayTodos.forEach(todo => {
        if (todo.status === 'active') {
            active+= 1
        }
    });

    return active
  }

  return (
    <div className={containerTheme + " " + shadowTheme + " new-container margin-40 width-600"}>
        {displayItems}
        <div className={footerTheme + " small padding-30 todo-footer"}>
            <span>{countActive()} items left</span>
            <div>
                <span className="margin-right-20 pointer">All</span>
                <span className="margin-right-20 pointer">Active</span>
                <span className="pointer">Completed</span>
            </div>
            <span className="pointer">Clear Completed</span>
        </div>
    </div>
  );
}

export default DisplayTodo;
