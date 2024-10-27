import ColorBar from '../ColorBar';
import AddNewColor from '../AddNewColor';
import { getParentClassForMode } from '../../../utils';

interface CompareAllProps {
    colorBars: string[];
    selectedMode: 'all' | 'third' | 'neighbor'; // Narrowing down the type
    selectedContrast: number;
    addColorBar: () => void;
    handleColorChange: (index: number, newColor: string) => void;
    removeColorBar: (index: number) => void;
}

const CompareAll = ({
    colorBars,
    selectedMode,
    selectedContrast,
    addColorBar,
    handleColorChange,
    removeColorBar,
}: CompareAllProps): JSX.Element => {
    const parentClass = getParentClassForMode(selectedMode);

    return (
        <div className={`color-bars ${parentClass}`}>
            {colorBars.map((color, index) => (
                <div className="color-bar-container" key={index} role="button">
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
                </div>
            ))}
            <AddNewColor
                addColorBar={addColorBar}
                colorBars={colorBars}
                selectedMode={selectedMode}
            />
        </div>
    );
};

export default CompareAll;
