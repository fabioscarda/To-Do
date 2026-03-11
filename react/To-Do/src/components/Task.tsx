import { useState } from "react"

interface TaskType {
    id: number
    text: string
    time: string
    completed: boolean
}

interface Props {
    task: TaskType
    removeTask: (id: number) => void
}

function Task({ task, removeTask }: Props) {
    const [completed, setCompleted] = useState(task.completed)

    return (
        <>
            <li key={task.id} className="task-container">
                <div className={completed ? "task-completed" : "task"}>
                    <div className="task-left">
                        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                        <span className="task-text">{task.text}</span>
                    </div>

                    <div className="task-right">
                        {task.time && <span className="time">{task.time}</span>}
                        <button className="delete" onClick={() => removeTask(task.id)}>✖</button>
                    </div>
                </div>
            </li>

        </>
    )
}

export default Task