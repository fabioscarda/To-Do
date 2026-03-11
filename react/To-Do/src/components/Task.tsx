import { useState } from "react"

type TaskType = {
    id: number
    text: string
    time: string
    checked: boolean
}

type Props = {
    task: TaskType
    removeTask: (id: number) => void
}

function Task({ task, removeTask }: Props) {
    const [checked, setChecked] = useState(task.checked)

    return (
        <>
            <li key={task.id} className="task-container">
                <div className={checked ? "task-completed" : "task"}>
                    <div className="task-left">
                        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
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