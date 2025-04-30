import './TodoList.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { reorderTasks } from '../../../store/actionCreators/TodoActionsCreator';
import TodoListEmpty from '../TodoListEmpty/TodoListEmpty';
import SortableItem from '../SortableItem/SortableItem';
import TaskItem from '../TaskItem/TaskItem';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from '@dnd-kit/sortable';

import CustomDragOverlay from '../../CustomDragOverlay/CustomDragOverlay';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

const TodoList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = ({ active }) => {
        const task = tasks.find(t => t.id === active.id);
        setActiveTask(task || null);
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveTask(null);

        if (active.id !== over?.id) {
            const oldIndex = tasks.findIndex(t => t.id === active.id);
            const newIndex = tasks.findIndex(t => t.id === over.id);
            dispatch(reorderTasks(arrayMove(tasks, oldIndex, newIndex)));
        }
    };
    console.log(tasks);

    if (tasks.length === 0) return <TodoListEmpty />;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <SortableItem key={task.id} task={task} index={index} />
                    ))}
                </ul>
            </SortableContext>

            <CustomDragOverlay>
                {activeTask && (
                    <TaskItem
                        task={activeTask}
                        index={tasks.findIndex(t => t.id === activeTask.id)}
                    />
                )}
            </CustomDragOverlay>
        </DndContext>
    );
};

export default TodoList;
