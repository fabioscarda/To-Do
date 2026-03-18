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
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedView, setSelectedView] = useState("all")
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [categorys, setCategorys] = useState<string[]>([])

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    setSelectedDate(formattedToday);
  }, [])

  useEffect(() => {
    const tasksJSON = localStorage.getItem(selectedDate);
    if (tasksJSON) {
      setTasks(JSON.parse(tasksJSON));
      for (const task of JSON.parse(tasksJSON)) {
        if (task.category && task.category.trim() !== "" && !categorys.includes(task.category))
          setCategorys(prevCategorys => [...prevCategorys, task.category]);
      }
    }
    else {
      setTasks([]);
      setCategorys([]);
    }
    console.log(selectedDate);
    console.log(tasksJSON);


  }, [selectedDate])

  useEffect(() => {
    localStorage.removeItem(selectedDate);
    localStorage.setItem(selectedDate, JSON.stringify(tasks));
  }, [tasks])


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

      <h1>Le mie attività {selectedDate}</h1>

      <TaskForm addTask={addTask} />

      <ul>
        <NavBar
          view={setSelectedView}
          date={setSelectedDate}
          currentView={selectedView} />
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