import { useState, useRef, useEffect } from 'react';

interface UseColorBarInteractionsProps {
    colorBars: string[];
    setColorBars: (newColorBars: string[]) => void;
}

interface UseColorBarInteractionsReturnType {
    selectedIndex: number | null;
    draggedIndex: number | null;
    visibleContrastBoxIndex: number | null;
    colorBarRefs: React.MutableRefObject<Array<HTMLElement | null>>;
    handleKeyUp: (event: React.KeyboardEvent, index: number) => void;
    handleKeyInteraction: (
        key: string,
        index: number,
        preventDefault: () => void,
    ) => void;
    handleDragStart: (index: number) => void;
    handleDragEnter: (index: number) => void;
    handleDragEnd: () => void;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setVisibleContrastBoxIndex: React.Dispatch<
        React.SetStateAction<number | null>
    >;
}

/**
 * A custom hook that handles keyboard navigation and drag-and-drop interactions for color bars.
 *
 * @param {Object} props - The props for the hook.
 * @param {string[]} props.colorBars - An array of color strings representing the color bars.
 * @param {(newColorBars: string[]) => void} props.setColorBars - A function to update the state of color bars.
 *
 * @returns {Object} - The return value of the hook.
 * @returns {number | null} selectedIndex - The index of the currently selected color bar, or null if none is selected.
 * @returns {number | null} draggedIndex - The index of the color bar currently being dragged, or null if none is being dragged.
 * @returns {number | null} visibleContrastBoxIndex - The index of the color bar for which the contrast box is visible, or null if none is visible.
 * @returns {React.MutableRefObject<HTMLElement[]>} colorBarRefs - A ref object to keep track of color bar elements.
 * @returns {(event: React.KeyboardEvent, index: number) => void} handleKeyUp - Function to handle keyboard events for navigation and selection.
 * @returns {(index: number) => void} handleDragStart - Function to initiate dragging of a color bar.
 * @returns {(index: number) => void} handleDragEnter - Function to handle entering a drag target (another color bar).
 * @returns {() => void} handleDragEnd - Function to handle the end of a drag action.
 * @returns {React.Dispatch<React.SetStateAction<number | null>>} setSelectedIndex - Function to manually set the selected index.
 * @returns {React.Dispatch<React.SetStateAction<number | null>>} setVisibleContrastBoxIndex - Function to manually set the visible contrast box index.
 */

export const useColorBarInteractions = ({
    colorBars,
    setColorBars,
}: UseColorBarInteractionsProps): UseColorBarInteractionsReturnType => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Selected index is the index of the current color bar
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // Index of the color bar currently being dragged
    const [visibleContrastBoxIndex, setVisibleContrastBoxIndex] = useState<
        number | null
    >(null); // Index of the color bar for which contrast box is visible
    const colorBarRefs = useRef<Array<HTMLElement | null>>([]); // Keeps track of references to the DOM elements of the color bars

    // Runs when the `selectedIndex` changes.
    useEffect(() => {
        if (selectedIndex !== null) {
            // If a color bar is selected, the corresponding DOM element is focused
            colorBarRefs.current[selectedIndex]?.focus();
        }
    }, [selectedIndex]);

    // Swaps two color bars in the `colorBars` array
    const swapColors = (fromIndex: number, toIndex: number): void => {
        const newColorBars = [...colorBars];
        // Swaps the elements at fromIndex and toIndex
        [newColorBars[fromIndex], newColorBars[toIndex]] = [
            newColorBars[toIndex],
            newColorBars[fromIndex],
        ];

        setColorBars(newColorBars); // Updates the state with the new array
        setDraggedIndex(toIndex); // Updates the `draggedIndex` to reflect the new position of the dragged item.
    };

    // Handles keyboard event for navigating and selecting color bars.
    const handleKeyInteraction = (
        key: string,
        index: number,
        preventDefault: () => void,
    ): void => {
        if (key === 'ArrowRight' && index < colorBars.length - 1) {
            // If color bar is being dragged (with mouse or space bar), swap the colors
            if (draggedIndex !== null && draggedIndex === selectedIndex) {
                if (selectedIndex !== null) {
                    swapColors(selectedIndex, selectedIndex + 1);
                    setSelectedIndex(selectedIndex + 1);
                }
            } else {
                // Moves the selection to next color bar. (keyboard nav)
                setSelectedIndex(index + 1);
            }
        } else if (key === 'ArrowLeft' && index > 0) {
            // If color bar is being dragged, swap the colors
            if (draggedIndex !== null && draggedIndex === selectedIndex) {
                if (selectedIndex !== null) {
                    swapColors(selectedIndex, selectedIndex - 1);
                    setSelectedIndex(selectedIndex - 1);
                }
            } else {
                // Moves the selection to previous color bar. (keyboard nav)
                setSelectedIndex(index - 1);
            }
        } else if ((key === ' ' || key === 'Enter') && selectedIndex !== null) {
            preventDefault();
            // Handles selection of color bar using space key
            if (draggedIndex === null) {
                setDraggedIndex(selectedIndex);
            } else {
                setDraggedIndex(null); // Drop it down
                setSelectedIndex(null); // Remove focus after dropping
                colorBarRefs.current[index]?.blur();
            }
        }
    };

    // Sets `draggedIndex` to the index of the color bar being dragged
    const handleDragStart = (index: number): void => {
        setDraggedIndex(index);
        setVisibleContrastBoxIndex(null); // To hide the contrast box when dragging starts
    };

    // Swaps the color bar currently being dragged with the one at `index` where the drag started.
    // It then updates `draggedIndex` and `selectedIndex` to reflect the new positions.
    const handleDragEnter = (index: number): void => {
        if (draggedIndex !== null && draggedIndex !== index) {
            swapColors(draggedIndex, index);
            setDraggedIndex(index);
            setSelectedIndex(index);
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent, index: number): void => {
        handleKeyInteraction(event.key, index, () => {
            event.preventDefault();
        });
    };

    // Checks if `draggedIndex` is valid. If valid it blurs dragged color bar to remove focus.
    // Resets `draggedIndex` and `selectedIndex` to null after dragging is finished.
    const handleDragEnd = (): void => {
        if (
            draggedIndex !== null &&
            draggedIndex >= 0 &&
            draggedIndex < colorBarRefs.current.length
        ) {
            const ref = colorBarRefs.current[draggedIndex];
            if (ref !== null && ref !== undefined) {
                ref.blur(); // Blur the last dragged element to remove focus
            }
        }
        setDraggedIndex(null);
        setSelectedIndex(null); // Remove focus after dropping
        setVisibleContrastBoxIndex(draggedIndex); // Show the contrast box again after dragging

        // By resetting focus after drag ends, user can continue interacting with the UI without
        // unintended focus issues.
    };

    return {
        selectedIndex,
        draggedIndex,
        visibleContrastBoxIndex,
        colorBarRefs,
        handleKeyInteraction,
        handleKeyUp,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
        setSelectedIndex,
        setVisibleContrastBoxIndex,
    };
};
