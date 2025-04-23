import { v4 as uuidv4 } from 'uuid';
import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, CLEAR_ALL_TASKS, REORDER_TASKS } from "../actions/TodoActions";

export const addTask = (text) => {
    return {
        type: ADD_TASK,
        id: uuidv4(),
        text,
    };
};

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        id,
    };
};

export const toggleTask = (id) => {
    return {
        type: TOGGLE_TASK,
        id,
    };
};

export const clearAllTasks = () => {
    localStorage.removeItem('todoState');
    return {
        type: CLEAR_ALL_TASKS
    };
};

export const reorderTasks = (tasks) => ({
    type: REORDER_TASKS,
    tasks,
});