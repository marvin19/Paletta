import ColorBar from '../ColorBar';
import AddNewColor from '../AddNewColor';

interface CompareAllProps {
    colorBars: string[];
    selectedMode: 'all' | 'third' | 'neighbor'; // Narrowing down the type
    selectedContrast: number;
    parentClass: string;
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
    parentClass,
}: CompareAllProps): JSX.Element => {
    return (
        <div className={`color-bars ${parentClass}`}>
            {colorBars.map((color, index) => (
                <div className="color-bar-container" key={index}>
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
