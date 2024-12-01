import { memo } from 'react';

import ColorBarContent from './ColorBarContent';

interface ColorBarProps {
    color: string;
    selectedMode?: 'all' | 'third' | 'adjacent';
    allColors?: string[];
    selectedContrast?: number;
    removeColorBar?: () => void;
    onColorChange?: (color: string) => void;
    isThirdContrastColor?: boolean;
}

const ColorBar = ({
    color,
    selectedMode,
    allColors = [],
    selectedContrast,
    removeColorBar = () => {},
    onColorChange = () => {},
    isThirdContrastColor = false, // default value
}: ColorBarProps): JSX.Element => {
    return (
        <div className="color-bar-outer" style={{ backgroundColor: color }}>
            <ColorBarContent
                removeColorBar={removeColorBar}
                onColorChange={onColorChange}
                color={color}
                selectedMode={selectedMode ?? ''}
                selectedContrast={selectedContrast}
                allColors={allColors}
                isThirdContrastColor={isThirdContrastColor}
            />
        </div>
    );
};

export default memo(ColorBar);
