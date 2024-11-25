/**
 *
 * Constants
 *
 */

const WCAG_TRIPLE_AA_TEXT_CONTRAST_THRESHOLD = 7;
const WCAG_TEXT_CONTRAST_THRESHOLD = 4.5;
const WCAG_GRAPHIC_CONTRAST_THRESHOLD = 3;

/**
 *
 * Get a random number between 0 and 255 to use as RGB value
 *
 * @returns number - Random number between 0 and 255
 */

export const getRgb = (): number => {
    return Math.floor(Math.random() * 256);
};

/**
 *
 * Convert RGB values to hex color
 *
 * @param r
 * @param g
 * @param b
 * @returns string - Hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
};

/**
 *
 * Generate a random hex color.
 * Used in third mode.
 *
 * @returns string - Random hex color
 *
 */
export const generateNewRandomColor = (): string => {
    return rgbToHex(getRgb(), getRgb(), getRgb());
};

/**
 *
 * Calculating the contrast ratio between two colors
 * Colors are coming in as hex colors.
 *
 * @param color1
 * @param color2
 * @returns
 */
export const calculateContrastRatio = (
    color1: string,
    color2: string,
): number => {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);

    // Formula for calculating luminance (L1 + 0.05) / (L2 + 0.05)
    // +0.05 is added to prevent division by zero
    // Math.max and Math.min are to ensure that L1 is the luminance of the lighter color and LS is the luminance of the darker color
    const contrast =
        (Math.max(luminance1, luminance2) + 0.05) /
        (Math.min(luminance1, luminance2) + 0.05);

    return parseFloat(contrast.toFixed(2));
};

/**
 *
 * Calculating the relative luminance of a color.
 * Color is coming in as hex
 *
 * @param color
 * @returns
 */
export const getLuminance = (color: string): number => {
    // Transforming hex to Rgb
    const rgb = hexToRgb(color);

    // calculating relative luminance from rgb values
    const a = [rgb.r, rgb.g, rgb.b].map((v) => {
        // Dividing the value by 255 to normalize it to a range of 0 to 1
        v /= 255;
        // Applying a piecewise gamma correction.
        // If value is less than or equal to 0.03928, divide by 12.92.
        // Otherwise, add 0.055 and raise to the power of 2.4
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    // calculating relative luminance as a number. The relative luminance can range from 0 (black) to 1 (white)
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 *
 * Converting a hex color to rgb format
 *
 * @param hex
 * @returns
 */

export const hexToRgb = (hex: string): any => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result !== null
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * Find a third color that meets the contrast ratio with the two colors
 *
 * @param colors - Array of the two colors
 * @param selectedContrast - The selected contrast ratio
 * @returns
 */
export const generateThirdContrastColor = (
    colors: string[],
    selectedContrast: number,
): string | null => {
    let newColor: string | null = null;
    for (let i = 0; i < 1000; i++) {
        newColor = rgbToHex(getRgb(), getRgb(), getRgb());
        if (
            calculateContrastRatio(newColor, colors[0]) >= selectedContrast &&
            calculateContrastRatio(newColor, colors[1]) >= selectedContrast
        ) {
            return newColor;
        }
    }
    // No color found
    return null;
};

/**
 * Function to check which mode is selected and return the parent class
 *
 * @param selectedMode - The selected mode
 * @returns
 */

export const getParentClassForMode = (selectedMode?: string): string => {
    if (selectedMode === 'neighbor') {
        return 'neighbor';
    } else if (selectedMode === 'all') {
        return 'all';
    } else if (selectedMode === 'third') {
        return 'third';
    }
    return '';
};

/**
 * Using contrastRatio and selectedContrast to calculate the WCAG level
 * and also if the contrast ratio meets the selected WCAG level
 *
 * @param contrastRatio - The contrast ratio between two colors
 * @param selectedContrast - The selected contrast ratio
 * @returns { level: string; meetsWCAG: boolean } - The WCAG level and if the contrast ratio meets the selected WCAG level
 */
export const getWCAGLevel = (
    contrastRatio: number,
    selectedContrast: number,
): { level: string; meetsWCAG: boolean } => {
    if (selectedContrast === WCAG_TEXT_CONTRAST_THRESHOLD) {
        return {
            level: 'AA',
            meetsWCAG: contrastRatio >= WCAG_TEXT_CONTRAST_THRESHOLD,
        };
    } else if (selectedContrast === WCAG_GRAPHIC_CONTRAST_THRESHOLD) {
        return {
            level: 'A',
            meetsWCAG: contrastRatio >= WCAG_GRAPHIC_CONTRAST_THRESHOLD,
        };
    } else if (selectedContrast === WCAG_TRIPLE_AA_TEXT_CONTRAST_THRESHOLD) {
        return {
            level: 'AAA',
            meetsWCAG: contrastRatio >= WCAG_TRIPLE_AA_TEXT_CONTRAST_THRESHOLD,
        };
    }
    return { level: '', meetsWCAG: false };
};

/**
 * Shuffle algorithm to randomize array order.
 * Used to give a random order to the color bars when opening the app
 *
 * @param {string[]} array - Array to shuffle
 * @returns {string[]} newArray - Shuffled array
 */

export const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array]; // Copy the array to avoid mutation

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/* -------------------------- Currently not in use -------------------------- */
/**
 *
 * Validating a hex color that is coming in as a string
 * Currently not in use
 *
 * @param value
 * @returns
 */

export const validateColorInput = (value: string): string | null => {
    if (value.length > 7) {
        return 'Input cannot exceed 7 characters.';
    }

    if (value.split('#').length > 2) {
        return 'Input cannot contain more than one hash symbol.';
    }

    return null;
};

/**
 *
 * Adding a # to a input field if it doesn't already have one
 * Currently not in use
 *
 * @param value
 * @returns
 */
export const formatColorInput = (value: string): string => {
    if (value !== '' && value[0] !== '#') {
        return '#' + value;
    }
    return value;
};
