import { useState } from "react"
import "./App.css"
import Task from "./components/Task"
import TaskForm from "./components/TaskForm"

type TaskType = {
  id: number
  text: string
  time: string
}

function App() {

  const [tasks, setTasks] = useState<TaskType[]>([])

  function addTask(text: string, time: string) {
    const newTask: TaskType = {
      id: Date.now(),
      text,
      time
    }

    setTasks([...tasks, newTask])
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">

      <h1>Le mie attività</h1>

      <TaskForm addTask={addTask} />

      <ul>
        {tasks.map(task => (
           <Task
              task={task}
              removeTask={removeTask}
            />
        ))}
      </ul>

    </div>
  )
}

export default App