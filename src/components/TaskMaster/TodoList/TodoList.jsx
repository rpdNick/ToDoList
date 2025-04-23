import './TodoList.scss';
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, reorderTasks } from '../../../store/actionCreators/TodoActionsCreator';
import TodoListEmpty from '../TodoListEmpty/TodoListEmpty';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import { restrictToVerticalAxis, restrictToWindowEdges  } from '@dnd-kit/modifiers';

const SortableItem = ({ task, index }) => {
    const dispatch = useDispatch();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <li ref={setNodeRef} style={style} className="task-item">
            <span className="drag-handle" {...attributes} {...listeners}>⠿</span>
            <div className='item_content'>
                <span className="task_number">{index + 1}.</span>
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                />
                <span className={`task-content ${task.completed ? "completed" : ""}`}>{task.text}</span>
                <button className="delete-btn" onClick={() => dispatch(deleteTask(task.id))}>×</button>
            </div>
        </li>
    );
};


const TodoList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over?.id);
            const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
            dispatch(reorderTasks(reorderedTasks));
        }
    };

    if (tasks.length === 0) {
        return <TodoListEmpty />;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul className="task-list" id="task-list">
                    {tasks.map((task, index) => (
                        <SortableItem key={task.id} task={task} index={index} />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
};

export default TodoList;