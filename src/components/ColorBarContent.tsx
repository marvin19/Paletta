import ContrastText from './ContrastText';
import ColorPicker from './ColorPicker';
import ContrastBoxFull from './ContrastBoxFull';
import RemoveColorButton from './RemoveColorButton';
import useTextColor from '../hooks/useTextColor';

interface ColorBarContentProps {
    allColors: string[];
    selectedMode: string;
    selectedContrast?: number;
    color: string;
    onColorChange: (color: string) => void;
    removeColorBar: () => void;
}

const ColorBarContent = ({
    allColors,
    selectedMode,
    color,
    removeColorBar,
    onColorChange,
    selectedContrast,
}: ColorBarContentProps): JSX.Element => {
    const textColor = useTextColor(color);
    const otherColors = allColors.filter((c) => c !== color);
    const handleColorChange = (newColor: string): void => {
        onColorChange(newColor);
    };

    return (
        <>
            <div className="color-bar-inner">
                <div className="color-bar-inner-inner">
                    <ContrastText color={color} textColor={textColor} />
                </div>
                {selectedMode === 'all' && (
                    <ContrastBoxFull
                        activeColor={color}
                        otherColors={otherColors}
                        selectedContrast={selectedContrast ?? 0}
                    />
                )}
                <ColorPicker color={color} onColorChange={handleColorChange} />
            </div>
            <RemoveColorButton removeColorBar={removeColorBar} />
        </>
    );
};

export default ColorBarContent;
