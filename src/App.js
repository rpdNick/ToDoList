import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import TaskMaster from './components/TaskMaster/TaskMaster';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskMaster />
      </div>
    </Provider>
  );
}

export default App;
