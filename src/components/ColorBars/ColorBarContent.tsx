import ContrastText from '../Base/ContrastText';
import ColorPicker from '../Base/ColorPicker';
import ContrastBoxFull from './ContrastBoxFull';
import RemoveColorButton from '../Base/RemoveColorButton';
import useTextColor from '../../hooks/useTextColor';
import useOtherColor from '../../hooks/useOtherColor';

interface ColorBarContentProps {
    allColors: string[];
    selectedMode: string;
    selectedContrast?: number;
    color: string;
    onColorChange: (color: string) => void;
    removeColorBar: () => void;
    isThirdContrastColor?: boolean | undefined;
}
// TODO: Fix the selectedContrast ?? 0 typing

const ColorBarContent = ({
    allColors,
    selectedMode,
    color,
    removeColorBar,
    onColorChange,
    selectedContrast,
    isThirdContrastColor,
}: ColorBarContentProps): JSX.Element => {
    const [textColor, textContrastRatio] = useTextColor(
        color,
        selectedContrast ?? 0,
    );
    const otherColors = useOtherColor(allColors, color);
    const handleColorChange = (newColor: string): void => {
        onColorChange(newColor);
    };
    const lengthOfColors = allColors.length;

    return (
        <>
            <div className="color-bar-inner">
                <div className="color-bar-inner-inner">
                    <ContrastText
                        textColor={textColor}
                        textContrastRatio={textContrastRatio}
                        selectedContrast={selectedContrast ?? 0}
                    />
                </div>
                {selectedMode === 'all' && (
                    <ContrastBoxFull
                        activeColor={color}
                        otherColors={otherColors}
                        selectedContrast={selectedContrast ?? 0}
                    />
                )}
                {isThirdContrastColor === false && (
                    <ColorPicker
                        color={color}
                        onColorChange={handleColorChange}
                    />
                )}
                {isThirdContrastColor === true && (
                    <div style={{ width: '100%' }}>
                        <p
                            className="contrast-text"
                            style={{ color: textColor, margin: 'auto 0' }}
                        >
                            {color}
                        </p>
                    </div>
                )}
            </div>
            {selectedMode !== 'third' && lengthOfColors > 2 && (
                <RemoveColorButton
                    removeColorBar={removeColorBar}
                    textColor={textColor}
                />
            )}
        </>
    );
};

export default ColorBarContent;
