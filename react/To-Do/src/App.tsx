import { useEffect, useState } from "react"
import "./App.css"
import Task from "./components/Task"
import TaskForm from "./components/TaskForm"
import Calendar from "./components/Calendar"

type TaskType = {
  id: number
  text: string
  time: string
  checked: boolean
  category?: string
}

function App() {
  const [selectedDate, setSelectedDate] = useState<String>("2026-03-11")
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [categorys, setCategorys] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<String>("")
  useEffect(() => { console.log(tasks); }, [tasks])

  function addTask(text: string, time: string, checked: boolean, category: string) {
    const newTask: TaskType = {
      id: Date.now(),
      text,
      time,
      checked,
      category
    }

    setTasks(prevTasks => [...prevTasks, newTask])

    // Aggiungi la categoria solo se non è vuota e non è già presente
    if (category && category.trim() !== "" && !categorys.includes(category)) {
        setCategorys(prevCategorys => [...prevCategorys, category]);
    }
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
    // Potrebbe essere necessario ripulire `categorys` se l'ultima task di una categoria viene rimossa,
    // ma per il problema delle chiavi duplicate non è strettamente necessario qui.
  }
  function setDate(date: string) { setSelectedDate(date) }

  return (
    <div className="app">

      <h1>Le mie attività</h1>

      <TaskForm addTask={addTask} />

      <ul>
        <Calendar setDate={setDate} />
      </ul>

      <ul>
        {tasks.filter(task => task.category === undefined || task.category === "").map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask} />
          ))}

        {categorys && categorys.length > 0 && (
          categorys.map(category => (
            <div key={category}>
              <hr />
              <h2>{category}</h2>
              {tasks.filter(task => task.category === category).map(task => (
                <Task
                  key={task.id}
                  task={task}
                  removeTask={removeTask} />
              ))}
            </div>
          ))
        )}

      </ul>

    </div>
  )
}

export default App