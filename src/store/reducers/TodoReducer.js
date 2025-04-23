import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, CLEAR_ALL_TASKS, REORDER_TASKS } from '../actions/TodoActions';

const initialState = {
    tasks: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
                ]
            };

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.id)
            };

        case TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.id ? { ...task, completed: !task.completed } : task
                )
            };

        case CLEAR_ALL_TASKS:
            return {
                ...state,
                tasks: []
            };

        case REORDER_TASKS:
            return {
                ...state,
                tasks: action.tasks
            };

        default: return state;
    }
}

export default reducer;