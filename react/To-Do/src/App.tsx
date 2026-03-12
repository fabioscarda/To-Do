import { useEffect, useState } from "react"
import "./App.css"
import Task from "./components/Task"
import TaskForm from "./components/TaskForm"
import NavBar from "./components/Navbar"

type TaskType = {
  id: number
  text: string
  time: string
  completed: boolean
  category?: string
}

function App() {
  const [selectedDate, setSelectedDate] = useState("11-03-2026")
  const [selectedView, setSelectedView] = useState("all")
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [categorys, setCategorys] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  useEffect(() => { console.log(tasks); }, [tasks])

  /*const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }
    , []

  )
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  }*/

  function addTask(text: string, time: string, completed: boolean, category: string) {
    const newTask: TaskType = {
      id: Date.now(),
      text,
      time,
      completed,
      category
    }

    setTasks(prevTasks => [...prevTasks, newTask])

    if (category && category.trim() !== "" && !categorys.includes(category)) {
      setCategorys(prevCategorys => [...prevCategorys, category]);
    }
  }

  function setTaskCompleted(id: number) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (selectedView === "completed") return task.completed;
    if (selectedView === "not-completed") return !task.completed;
    return true;
  });


  return (
    <div className="app">

      <h1>Le mie attività</h1>

      <TaskForm addTask={addTask} />

      <ul>
        <NavBar
          view={setSelectedView}
          date={setSelectedDate} 
          currentView={selectedView}/>
      </ul>
      <br />
      <ul>

        {filteredTasks
          .filter(task => !task.category)
          .map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              setTaskCompleted={setTaskCompleted}
            />
          ))}

        {categorys && categorys.map(category => {
          const categoryTasks = filteredTasks.filter(task => task.category === category);

          if (categoryTasks.length === 0) return null;

          return (
            <div key={category}>
              <br />
              <h3>{category}</h3>
              {categoryTasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  removeTask={removeTask}
                  setTaskCompleted={setTaskCompleted}
                />
              ))}
            </div>
          );
        })}

      </ul>

    </div>
  )
}

export default App