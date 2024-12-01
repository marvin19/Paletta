import { getWCAGLevel } from '../../utils';
interface ContrastTextProps {
    textColor: string;
    textContrastRatio: number;
    selectedContrast: number;
}
/**
 * Component that displays the contrast ratio of the text color
 * with the background color.
 *
 * The component displays the contrast ratio and the WCAG level
 * based on the contrast ratio. If background color does not meet contrast
 * requirements with black text, it will try white text. If neither black or white
 * works it will default to black and display "N/A" for contrast ratio.
 *
 * @param {string} textColor - The text color to display.
 * @param {number} textContrastRatio - The contrast ratio of the text color against background color.
 * @param {number} selectedContrast - The selected contrast ratio in the menu bar.
 * @returns {JSX.Element} The contrast ratio and WCAG level.
 */
const ContrastText = ({
    textColor,
    textContrastRatio,
    selectedContrast,
}: ContrastTextProps): JSX.Element => {
    const { level } = getWCAGLevel(textContrastRatio, selectedContrast);

    return (
        <div className="contrast-text-container">
            <p className="contrast-text" style={{ color: textColor }}>
                {textContrastRatio !== 0 ? (
                    <>
                        {`${textContrastRatio}:1`}
                        <span className="contrast-level">({level})</span>
                    </>
                ) : (
                    'N/A'
                )}
            </p>
            <p className="contrast-text-label" style={{ color: textColor }}>
                {textContrastRatio !== 0
                    ? 'Text Contrast Ratio'
                    : 'No sufficient text contrast found'}
            </p>
        </div>
    );
};

export default ContrastText;
