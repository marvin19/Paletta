import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface RemoveColorButtonProps {
    textColor: string;
    removeColorBar: () => void;
}

const RemoveColorButton = ({
    removeColorBar,
    textColor,
}: RemoveColorButtonProps): JSX.Element => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <button
            className="remove-color"
            onClick={removeColorBar}
            onFocus={() => {
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}
            aria-label="Remove color"
            style={{
                outline: isFocused ? `2px solid ${textColor}` : 'none',
                outlineOffset: '2px',
            }}
        >
            <FontAwesomeIcon icon={faX} style={{ color: textColor }} />
        </button>
    );
};

export default RemoveColorButton;
