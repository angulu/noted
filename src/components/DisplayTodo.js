import react, { useEffect, useState } from 'react';
import './AddTodo.css';
import Sun from '../assests/images/icon-sun.svg';
import Check from '../assests/images/icon-check.svg';

const DisplayTodo = (props) => {

  const { theme, updatedTodoCallback } = props

  const [todos, setTodos] = useState(props.displayTodos)
  const [filterStatus, setFilterStatus] = useState("")
  const [isActive, setActive] = useState("all")

  useEffect(() => {
      setTodos(props.displayTodos)
  }, [props.displayTodos])

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
    const temp = todos.map((todo, index) => {
        if (index === i) {
            todo.status === "active" ? todo.status = "completed" : todo.status = "active"
        } 

        return todo
    })

    setTodos(temp)
    updatedTodoCallback(temp)
  }

  const countActive = () => {
    let active = 0

    todos.forEach(todo => {
        if (todo.status === 'active') {
            active+= 1
        }
    });

    return active
  }

  const handleShowAll = () => {
    setActive("all")
    setFilterStatus("")
  }

  const handleShowActive = () => {
    setActive("active")
    setFilterStatus("active")
  }

  const handleShowCompleted = () => {
    setActive("completed")
    setFilterStatus("completed")
  }

  const handleRemoveCompleted = () => {
    const temp = todos.filter(todo => todo.status === "active")

    setTodos(temp)
    updatedTodoCallback(temp)
  }

  const handleDrop = (event) => {
    event.preventDefault()

    let temp, draggedIndex = parseInt(event.dataTransfer.getData("index"))
    let targetIndex = parseInt(event.target.parentElement.id)


    if (targetIndex < draggedIndex) { // increment others indexes

        temp = todos.map((todo, index) => {
            
            if (index > targetIndex - 1 && index < draggedIndex) {
                todo.order = targetIndex + 1
            }

            if (index === draggedIndex) todo.order = targetIndex

            return todo
        })
    } else {

        temp = todos.map((todo, index) => {
            
            if (index < targetIndex + 1 && index > draggedIndex) {
                todo.order = targetIndex - 1
            }

            if (index === draggedIndex) todo.order = targetIndex

            return todo
        })

    }
    console.log(temp);

    temp.sort((a, b) => {
        return a.order - b.order
    })

    console.log(temp);

    setTodos(temp)
    updatedTodoCallback(temp)
  }

  const displayItems = todos.map((todo, index) => {

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
    
    if (todo.status === filterStatus) {

        return (
            <div key={index} id={index} className={ borderTheme + " new-row padding-15"} draggable="true" onDragStart={(e) => e.dataTransfer.setData("index", index)}>
                <div className={radioBackground + " " + radioTheme + " check-div pointer"} onClick={() => handleCompleted(index)}>
                    {todo.status === "completed" && <img src={Check} className="check" alt="check"/>}
                </div>
                {todo.status === "completed" ? <del className={canceledTheme + " width-500"}>{todo.body}</del> : <span className={textTheme + " width-500"}>{todo.body}</span>}
            </div>
        )
    }

    if (filterStatus.length === 0) {

        return (
            <div key={index} id={index} className={ borderTheme + " new-row padding-15"} draggable="true" onDragStart={(e) => e.dataTransfer.setData("index", index)}>
                <div className={radioBackground + " " + radioTheme + " check-div pointer"} onClick={() => handleCompleted(index)}>
                    {todo.status === "completed" && <img src={Check} className="check" alt="check"/>}
                </div>
                {todo.status === "completed" ? <del className={canceledTheme + " width-500"}>{todo.body}</del> : <span className={textTheme + " width-500"}>{todo.body}</span>}
            </div>
        )
    }
  })

  return (
    <div className={containerTheme + " " + shadowTheme + " new-container margin-40 width-600"} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {displayItems}
        <div className={footerTheme + " small padding-30 todo-footer"}>
            <span>{countActive()} items left</span>
            <div>
                <span className={isActive === "all" ? "active margin-right-20 pointer" : "margin-right-20 pointer"} onClick={handleShowAll}>All</span>
                <span className={isActive === "active" ? "active margin-right-20 pointer" : "margin-right-20 pointer"} onClick={handleShowActive}>Active</span>
                <span className={isActive === "completed" ? "active pointer" : "pointer"} onClick={handleShowCompleted}>Completed</span>
            </div>
            <span className="pointer" onClick={handleRemoveCompleted}>Clear Completed</span>
        </div>
    </div>
  );
}

export default DisplayTodo;
