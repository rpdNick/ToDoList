import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../../../store/actionCreators/TodoActionsCreator';
import TaskItem from '../TaskItem/TaskItem';

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
        <div ref={setNodeRef} style={style}>
            <TaskItem
                task={task}
                index={index}
                onToggle={() => dispatch(toggleTask(task.id))}
                onDelete={() => dispatch(deleteTask(task.id))}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    );
};

export default SortableItem;