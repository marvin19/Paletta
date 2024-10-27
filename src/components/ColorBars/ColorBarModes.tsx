import { memo } from 'react';
import CompareAll from './Modes/CompareAll';
import ThirdColor from './Modes/ThirdColor';
import Neighbor from './Modes/Neighbor';
import useColorGeneration from '../../hooks/useColorGeneration';
import { getParentClassForMode } from '../../utils';

interface ColorBarModesProps {
    selectedContrast: number;
    selectedMode: 'all' | 'third' | 'neighbor';
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

    const parentClass = getParentClassForMode(selectedMode);

    const componentMapping: Record<string, JSX.Element> = {
        third: (
            <ThirdColor
                selectedContrast={selectedContrast}
                selectedMode={selectedMode}
                parentClass={parentClass}
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
                parentClass={parentClass}
            />
        ),
        neighbor: (
            <Neighbor
                colorBars={colorBars}
                selectedMode={selectedMode}
                selectedContrast={selectedContrast}
                setColorBars={setColorBars}
                handleColorChange={handleColorChange}
                removeColorBar={removeColorBar}
                addColorBar={addColorBar}
                parentClass={parentClass}
            />
        ),
    };

    return componentMapping[selectedMode];
};

export default memo(ColorBarModes);
