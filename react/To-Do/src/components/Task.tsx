interface TaskType {
    id: number
    text: string
    time: string
    completed: boolean
}

interface Props {
    task: TaskType
    removeTask: (id: number) => void
    setTaskCompleted: (id: number) => void
}

function Task({ task, removeTask, setTaskCompleted }: Props) {

    return (
        <>
            <li key={task.id} className="task-container">
                <div className={task.completed ? "task-completed" : "task"}>
                    <div className="task-left">
                        <input type="checkbox" checked={task.completed} onChange={() => setTaskCompleted(task.id)} />
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