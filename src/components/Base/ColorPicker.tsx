import { useRef, useId, useState } from 'react';

interface ColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
    const [inputValue, setInputValue] = useState(color);
    const colorInputRef = useRef<HTMLInputElement>(null);
    const uniqueId = useId().replace(/:/g, '');

    const handleTextInputChange = (value: string): void => {
        setInputValue(value);
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            // If it's a valid hex color, update the parent state
            onColorChange(value);
        }
    };

    return (
        <div className="color-picker-container" style={{ cursor: 'pointer' }}>
            <div className="color-picker">
                <label
                    htmlFor={`color-input-${uniqueId}`}
                    className="visually-hidden"
                >
                    Choose color
                </label>
                <input
                    ref={colorInputRef}
                    id={`color-input-${uniqueId}`}
                    type="color"
                    value={color}
                    onChange={(e) => {
                        onColorChange(e.target.value);
                    }}
                />
            </div>
            <input
                className="color-input-text"
                type="text"
                value={inputValue}
                onChange={(e) => {
                    handleTextInputChange(e.target.value);
                }}
            />
        </div>
    );
};

export default ColorPicker;
