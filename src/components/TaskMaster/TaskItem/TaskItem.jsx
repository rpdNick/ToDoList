const TaskItem = ({ task, index, onToggle, onDelete, dragHandleProps = {} }) => (
    <li className="task-item">
        <span className="drag-handle" {...dragHandleProps}>⠿</span>
        <div className="item_content">
            <span className="task_number">{index + 1}.</span>
            <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={onToggle}
            />
            <span className={`task-content ${task.completed ? "completed" : ""}`}>
                {task.text}
            </span>
            <button className="delete-btn" onClick={onDelete}>×</button>
        </div>
    </li>
);

export default TaskItem;
