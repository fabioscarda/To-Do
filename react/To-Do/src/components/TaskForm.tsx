import { useState } from "react"

type Props = {
  addTask: (text: string, time: string, checked: boolean, category: string) => void
}

function TaskForm({ addTask }: Props) {

  const [task, setTask] = useState("")
  const [category, setCategory] = useState("")
  const [time, setTime] = useState("")

  function handleAdd() {
    if (!task) return
    if(!category) setCategory("No category")
    addTask(task, time, false, category)

    setTask("")
    setCategory("")
    setTime("")
  }

  return (
    <div className="form">

      <input
        type="text"
        placeholder="Nuova attività"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={handleAdd}>
        Aggiungi
      </button>

    </div>
  )
}

export default TaskForm