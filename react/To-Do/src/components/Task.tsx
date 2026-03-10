type TaskType = {
    id: number
    text: string
    time: string
}

type Props = {
    task: TaskType
    removeTask: (id: number) => void
}

function Task({ task, removeTask }: Props) {

    return (
        <>
            <li key={task.id} className="task-container">
                <div className="task">
                    <div className="task-left">
                        <input type="checkbox" />
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