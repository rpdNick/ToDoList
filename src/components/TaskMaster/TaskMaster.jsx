import './TaskMaster.scss';
import TodoList from './TodoList/TodoList';
import TodoListFooter from './TodoListFooter/TodoListFooter';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from '../../store/actionCreators/TodoActionsCreator';

const TaskMaster = () => {
    const [taskValue, setTaskValue] = useState('');
    const dispatch = useDispatch();

    const getTaskValue = (e) => {
        let taskValue = e.target.value
        setTaskValue(taskValue);
    }

    const addNewTask = () => {
        if (taskValue.trim() === "") return;
        dispatch(addTask(taskValue)); // set action into store
        setTaskValue(''); // clear input
    }


    return (
        <div className="to_do_container">
            <div className="header">
                <h1>Task Master</h1>
                <p>Keep track of your daily tasks with ease</p>
            </div>

            <div className="form-container">
                <input type="text" className="task-input" id="task-input"
                    onChange={getTaskValue}
                    onKeyDown={(e) => (
                        e.key === 'Enter' ? addNewTask() : null
                    )}
                    value={taskValue}
                    placeholder="Add a new task..."
                    required
                />
                <button type="submit" className="add-btn" onClick={addNewTask}>Add Task</button>
            </div>

            <div className="tasks-container">
                <TodoList />
            </div>
            <TodoListFooter />
        </div>
    );
}

export default TaskMaster;