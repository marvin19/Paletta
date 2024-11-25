import { memo } from 'react';
import CompareAll from './Modes/CompareAll';
import ThirdColor from './Modes/ThirdColor';
import Adjacent from './Modes/Adjacent';
import useColorGeneration from '../../hooks/useColorGeneration';

interface ColorBarModesProps {
    selectedContrast: number;
    selectedMode: 'all' | 'third' | 'adjacent';
}

const ColorBarModes = ({
    selectedContrast,
    selectedMode,
}: ColorBarModesProps): JSX.Element => {
    const {
        colors: colorBars,
        handleColorChange,
        addColorBar,
        removeColorBar,
        setColorBars,
    } = useColorGeneration();

    const componentMapping: Record<string, JSX.Element> = {
        third: (
            <ThirdColor
                selectedContrast={selectedContrast}
                selectedMode={selectedMode}
            />
        ) as JSX.Element,
        all: (
            <CompareAll
                colorBars={colorBars}
                selectedMode={selectedMode}
                selectedContrast={selectedContrast}
                addColorBar={addColorBar}
                handleColorChange={handleColorChange}
                removeColorBar={removeColorBar}
            />
        ),
        adjacent: (
            <Adjacent
                colorBars={colorBars}
                selectedMode={selectedMode}
                selectedContrast={selectedContrast}
                setColorBars={setColorBars}
                handleColorChange={handleColorChange}
                removeColorBar={removeColorBar}
                addColorBar={addColorBar}
            />
        ),
    };

    return componentMapping[selectedMode];
};

export default memo(ColorBarModes);
