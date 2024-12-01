import ColorBarModes from '../ColorBars/ColorBarModes';

interface PaletteProps {
    selectedContrast: number;
    selectedMode: 'all' | 'third' | 'adjacent';
}

const Palette = ({
    selectedContrast,
    selectedMode,
}: PaletteProps): JSX.Element => {
    return (
        <main>
            <div className="palette" id="content">
                <ColorBarModes
                    selectedContrast={selectedContrast}
                    selectedMode={selectedMode}
                />
            </div>
        </main>
    );
};

export default Palette;
