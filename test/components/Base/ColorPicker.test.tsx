import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorPicker from '../../../src/components/Base/ColorPicker';

describe('ColorPicker', () => {
    it('renders the color picker with the correct initial color', () => {
        const color = '#ff0000';
        const handleColorChange = jest.fn();
        render(<ColorPicker color={color} onColorChange={handleColorChange} />);

        const colorInput = screen.getByLabelText('Choose color');
        //const colorText = screen.getByText(color);
        const colorValue = colorInput.getAttribute('value');

        expect(colorInput).toBeInTheDocument();
        expect(colorValue).toBe(color);
        //expect(colorText).toBeInTheDocument();
    });

    test.todo('calls the onColorChange function when the color is changed');

    // it('calls the onColorChange function when the color is changed', () => {
    //     const color = '#ff0000';
    //     const newColor = '#00ff00';
    //     const handleColorChange = jest.fn();
    //     render(<ColorPicker color={color} onColorChange={handleColorChange} />);

    //     const colorInput = screen.getByLabelText('Choose color');
    //     colorInput.setAttribute('value', newColor);
    //     colorInput.dispatchEvent(new Event('change'));

    //     expect(handleColorChange).toHaveBeenCalledWith(newColor);
    // });

    test.todo('triggers the color input click when the container is clicked');

    // it('triggers the color input click when the container is clicked', () => {
    //     const color = '#ff0000';
    //     const handleColorChange = jest.fn();
    //     const { container } = render(
    //         <ColorPicker color={color} onColorChange={handleColorChange} />,
    //     );

    //     const colorPickerContainer = container.querySelector(
    //         '.color-picker-container',
    //     );
    //     const colorInput = screen.getByLabelText('Choose color');

    //     if (colorPickerContainer) {
    //         fireEvent.click(colorPickerContainer);
    //         expect(document.activeElement).toBe(colorInput);
    //     } else {
    //         throw new Error('Color picker container not found');
    //     }
    // });
});
