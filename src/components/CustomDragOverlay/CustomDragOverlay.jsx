import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { DragOverlay } from '@dnd-kit/core';

const CustomDragOverlay = ({ children }) => {
    const containerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        containerRef.current = document.querySelector('.dnd-overlay-container');
        setMounted(true);
    }, []);

    if (!mounted || !containerRef.current) return null;

    return createPortal(
        <DragOverlay dropAnimation={null} style={{ pointerEvents: 'none' }} className="custom-drag-overlay">
            {children}
        </DragOverlay>,
        containerRef.current
    );
};

export default CustomDragOverlay;
