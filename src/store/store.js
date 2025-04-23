import { createStore } from 'redux';
import reducer from './reducers/TodoReducer';

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todoState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("todoState", serializedState);
    } catch (e) {
        console.log(e);
    }
};

const initialState = loadFromLocalStorage();
const store = createStore(reducer, initialState);

store.subscribe(() => {
    const state = store.getState();

    if (state.tasks.length === 0) {
        localStorage.removeItem('todoState');
    } else {
        saveToLocalStorage(state);
    }
});

export default store;