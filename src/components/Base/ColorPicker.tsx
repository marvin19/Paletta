import { useRef, useId, useState, useEffect } from 'react';
import WCAGCheck from '../ColorBars/WCAGCheck';

interface ColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
    const [inputValue, setInputValue] = useState(color);
    const [isValid, setIsValid] = useState(true);
    const [showValidation, setShowValidation] = useState(false);
    const colorInputRef = useRef<HTMLInputElement>(null);
    const uniqueId = useId().replace(/:/g, '');

    useEffect(() => {
        // Update text input when color prop changes
        setInputValue(color);
    }, [color]);

    const handleTextInputChange = (value: string): void => {
        // Ensure the value starts with '#'
        if (!value.startsWith('#')) {
            value = `#${value}`;
        }

        // Remove any characters after the first 6 (excluding the '#')
        if (value.length > 7) {
            value = value.slice(0, 7);
        }

        // Allow only valid hexadecimal characters
        const isValidHex = /^#[0-9A-Fa-f]{0,6}$/.test(value);
        setIsValid(isValidHex);
        setInputValue(value);

        // Show validation message when typing
        setShowValidation(false);

        // Update parent state only if it's a valid 6-character hex code
        if (isValidHex && value.length === 7) {
            onColorChange(value);
            setShowValidation(true);

            setTimeout(() => {
                setShowValidation(false);
            }, 2000);
        }
    };

    const handleColorPickerChange = (newColor: string): void => {
        setInputValue(newColor);
        onColorChange(newColor);
        setShowValidation(false); // Hide WCAGCheck when changing color picker
    };

    const handleBlur = (): void => {
        // On blur, validate the current input and update
        const isCompleteHex = /^#[0-9A-Fa-f]{6}$/.test(inputValue);
        setIsValid(isCompleteHex);

        if (!isCompleteHex) {
            setInputValue(color);
        }
    };

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (event.target === colorInputRef.current) {
            return;
        }

        if (event.key === 'Enter') {
            const isCompleteHex = /^#[0-9A-Fa-f]{6}$/.test(inputValue);
            setIsValid(isCompleteHex);

            // Show validation when enter is pressed
            setShowValidation(true);

            if (isCompleteHex) {
                onColorChange(inputValue);

                // Remove focus from the input field
                event.currentTarget.blur();
            }
        }
    };

    return (
        <div className="color-picker-container" style={{ cursor: 'pointer' }}>
            {showValidation ? (
                <WCAGCheck meetsWCAG={isValid} fontSize="1.0rem" />
            ) : (
                <div className="color-picker">
                    <div>
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
                                handleColorPickerChange(e.target.value);
                            }}
                        />
                    </div>
                </div>
            )}
            <label
                htmlFor={`color-input-text-${uniqueId}`}
                className="visually-hidden"
            />
            <input
                className="color-input-text"
                id={`color-input-text-${uniqueId}`}
                type="text"
                value={inputValue}
                onChange={(e) => {
                    handleTextInputChange(e.target.value);
                }}
                onBlur={handleBlur} // Handle blur event
                onKeyDown={handleKeyPress} // Handle Enter key
            />
        </div>
    );
};

export default ColorPicker;
