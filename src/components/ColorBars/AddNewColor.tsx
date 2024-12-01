import { useMemo } from 'react';

interface AddNewColorProps {
    addColorBar: () => void;
    colorBars: string[];
    selectedMode?: string;
}

const AddNewColor = ({
    addColorBar,
    colorBars,
    selectedMode = 'adjacent',
}: AddNewColorProps): JSX.Element | null => {
    // Memoize the className to avoic recalcualting on every render
    const buttonClassName = useMemo(() => {
        return `color-bar-outer add-color-bar ${selectedMode === 'all' ? 'all' : ''}`;
    }, [selectedMode]);

    // Return null if there are already 20 color bars
    if (colorBars.length >= 20) return null;

    return (
        <button
            type="button"
            className="color-bar-container add-color-bar-button"
            onClick={addColorBar}
            aria-label="Add new color"
        >
            <div className={buttonClassName}>
                <span>+ Add color</span>
            </div>
        </button>
    );
};

export default AddNewColor;
