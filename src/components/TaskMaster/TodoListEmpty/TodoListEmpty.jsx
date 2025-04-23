import './TodoListEmpty.scss';

const TodoListEmpty = () => {
    return (
        <div className="empty-state" id="empty-state">
            <div>📝</div>
            <p>No tasks yet. Add a task to get started!</p>
        </div>
    );
}

export default TodoListEmpty;