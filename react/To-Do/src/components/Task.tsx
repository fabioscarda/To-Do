import "./Task.css"

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
        <li className="task-container">
            <div className={task.completed ? "task-completed" : "task"}>
                <div className="task-left">
                    <input 
                        type="checkbox" 
                        className="custom-checkbox"
                        checked={task.completed} 
                        onChange={() => setTaskCompleted(task.id)} 
                    />
                    <div className="task-content">
                        <span className="task-text">{task.text}</span>
                        {task.time && <span className="time-badge">{task.time}</span>}
                    </div>
                </div>

                <button className="delete-btn" onClick={() => removeTask(task.id)} aria-label="Elimina">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
            </div>
        </li>
    )
}

export default Task