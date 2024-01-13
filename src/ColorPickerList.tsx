import ColorPicker from './ColorPicker';
import ColorText from './ColorText';
import { useState, useEffect } from 'react';


type ColorPickerListProps = {
    selectedOption: number;
}

const ColorPickerList: React.FC<ColorPickerListProps> = ({ selectedOption }) => {

  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  const initialColors = Array.from({ length: selectedOption }, () => rgbToHex(getRgb(), getRgb(), getRgb()));
  const [colors, setColors] = useState<string[]>([]);
  const [visibleColors, setVisibleColors] = useState<number>(0);

  useEffect(() => {
    if (selectedOption > colors.length){
      // If selectedOption increases, generate new colors for the additional color pickers
      const additionalColors = Array.from({ length: selectedOption - colors.length }, () => rgbToHex(getRgb(), getRgb(), getRgb()));
      setColors(prevColors => [...prevColors, ...additionalColors]);
    }
    setVisibleColors(selectedOption);
  }, [selectedOption]);

  


  const handleColorChange = (color: string, index: number) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  }

  const colorPickers = colors.slice(0, visibleColors).map((color, index) => {
    return (<li key={index}>
      <ColorText
        color={color}
        onColorChange={(newColor) => handleColorChange(newColor, index)}
      />
      <ColorPicker
          color={color}
          onColorChange={(newColor) => handleColorChange(newColor,index)}
        />
      </li>)
  });

  return (
    <div>
      <ul>
      {colorPickers}
      </ul>
    </div>
  )
}

export default ColorPickerList