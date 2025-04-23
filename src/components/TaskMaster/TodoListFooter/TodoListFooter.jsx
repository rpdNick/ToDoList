import './TodoListFooter.scss';
import { useSelector, useDispatch } from "react-redux";
import { clearAllTasks } from '../../../store/actionCreators/TodoActionsCreator';

const TodoListFooter = () => {

    const activeTasksCount = useSelector((state) =>
        state.tasks.filter((task) => !task.completed).length
    );

    const dispatch = useDispatch();

    return (
        <div className="footer">
            <div>You have <span className="task-count" id="task-count">{activeTasksCount}</span> tasks remaining</div>
            <button className="clear-all" id="clear-all" onClick={() => dispatch(clearAllTasks())}>Clear All Tasks</button>
        </div>
    );
}

export default TodoListFooter;