import { useState } from "react"

type Props = {
  addTask: (text: string, time: string) => void
}

function TaskForm({ addTask }: Props) {

  const [text, setText] = useState("")
  const [time, setTime] = useState("")

  function handleAdd() {
    if (!text) return

    addTask(text, time)

    setText("")
    setTime("")
  }

  return (
    <div className="form">

      <input
        type="text"
        placeholder="Nuova attività"
        value={text}
        onChange={(e) => setText(e.target.value)}
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