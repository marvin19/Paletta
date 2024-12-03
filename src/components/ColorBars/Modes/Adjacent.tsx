import AddNewColor from '../AddNewColor';
import ColorBar from '../ColorBar';
import ContrastBox from '../ContrastBox';
import { useColorBarInteractions } from '../../../hooks/useColorBarInteractions';

interface AdjacentProps {
    colorBars: string[];
    selectedMode: 'all' | 'third' | 'adjacent';
    selectedContrast: number;
    handleColorChange: (index: number, newColor: string) => void;
    removeColorBar: (index: number) => void;
    addColorBar: () => void;
    setColorBars: (newColorBars: string[]) => void;
}

const Adjacent = ({
    colorBars,
    selectedMode,
    selectedContrast,
    handleColorChange,
    removeColorBar,
    addColorBar,
    setColorBars,
}: AdjacentProps): JSX.Element => {
    const {
        selectedIndex,
        draggedIndex,
        colorBarRefs,
        handleKeyInteraction,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
        setSelectedIndex,
    } = useColorBarInteractions({ colorBars, setColorBars });

    const howToUse =
        'You can drag and drop the color bars to change their order ' +
        'to calculate contrast between them. Use the arrow keys to ' +
        'navigate between the color bars and the enter key to pick up ' +
        'a color bar and to put it down in a new position.';

    const handleClick = (index: number, event: React.MouseEvent): void => {
        // Check if the event originated from the color input or its parent container
        const isColorPickerClicked =
            event.target instanceof HTMLElement &&
            (event.target.tagName === 'INPUT' ||
                event.target.closest('.color-picker-container'));

        if (isColorPickerClicked !== undefined) {
            // Prevent the parent click from being triggered when ColorPicker is clicked
            return;
        }

        if (draggedIndex === null) {
            setSelectedIndex(null); // This removes focus
            (event.currentTarget as HTMLDivElement).blur();
        } else {
            setSelectedIndex(index);
        }
    };

    return (
        <div
            className="color-bars"
            aria-label={howToUse}
            onClick={() => {
                setSelectedIndex(null);
            }}
        >
            <div
                style={{ display: 'none' }}
                id="colorBarLiveRegion"
                aria-live="polite"
            ></div>
            {colorBars.map((color, index) => (
                <div
                    key={index}
                    className={`color-bar-container ${index === selectedIndex ? 'selected' : ''} ${
                        index === selectedIndex && draggedIndex !== null
                            ? 'dragging'
                            : ''
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Draggable color bar with color ${color}, press Enter to start dragging`}
                    draggable // Enable drag-and-drop
                    ref={(el) => (colorBarRefs.current[index] = el)}
                    onClick={(event) => {
                        handleClick(index, event); // Call the original click handler
                        handleKeyInteraction('Enter', index, () => {
                            event.preventDefault();
                        });
                    }}
                    onFocus={(event) => {
                        // Only if div is focused and not the input field or button
                        if (event.target === event.currentTarget) {
                            setSelectedIndex(index);
                        }
                    }}
                    onKeyUp={(event) => {
                        handleKeyInteraction(
                            event.key,
                            index,
                            event.preventDefault.bind(event),
                        );
                    }}
                    onDragStart={() => {
                        handleDragStart(index);
                    }}
                    onDragEnter={() => {
                        handleDragEnter(index);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                    }} // Prevent default drag image
                    onDragEnd={handleDragEnd}
                    style={{ transition: 'transform 0.3s ease' }}
                >
                    <ColorBar
                        color={color}
                        selectedMode={selectedMode}
                        onColorChange={(newColor) => {
                            handleColorChange(index, newColor);
                        }}
                        removeColorBar={() => {
                            removeColorBar(index);
                        }}
                        allColors={colorBars}
                        selectedContrast={selectedContrast}
                    />
                    {/* Only show the contrast box when not dragging and in 'adjacent' mode */}
                    {/* Show the contrast box unless the current color bar or its previous adjacent should hide it */}
                    {selectedMode === 'adjacent' &&
                        index < colorBars.length - 1 && ( // Ensure no contrast box on the last bar
                            /* draggedIndex !== index && // Hide the contrast box for the dragged bar
                        draggedIndex !== index + 1 && ( */ // Hide the contrast box for the previous bar (index + 1 is the previous one)
                            <ContrastBox
                                leftColor={colorBars[index]}
                                rightColor={colorBars[index + 1]}
                                selectedContrast={selectedContrast}
                            />
                        )}
                </div>
            ))}
            <AddNewColor addColorBar={addColorBar} colorBars={colorBars} />
        </div>
    );
};
export default Adjacent;
