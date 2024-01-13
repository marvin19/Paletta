import React, { useState, useEffect } from 'react';
import ColorBox from './ColorBox';
import ColorSelect from './ColorSelect';
import ContrastBox from './ContrastBox';
import ContrastSelect from './ContrastSelect';
import ColorPickerList from './ColorPickerList'

type CardGridProps = {
    colors: string[];
    setColors: (colors: string[]) => void;
}

const CardGrid: React.FC<CardGridProps> = () => {

  // You need to have two colors to check contrast
  const [selectedOption, setSelectedOption] = useState(2);
  const [selectedContrast, setSelectedContrast] = useState(0);
  const [colors, setColors] = useState<string[]>([]);
  const [visibleColors, setVisibleColors] = useState<number>(0);

  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  const handleColorChange = (color: string, index: number) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  }

  useEffect(() => {
    if (selectedOption > colors.length){
      // If selectedOption increases, generate new colors for the additional color pickers
      const additionalColors = Array.from({ length: selectedOption - colors.length }, () => rgbToHex(getRgb(), getRgb(), getRgb()));
      setColors(prevColors => [...prevColors, ...additionalColors]);
    }
    setVisibleColors(selectedOption);
  }, [selectedOption]);

  // Render color and contrast boxes together
  const renderColorAndContrastBoxes = () => {
	const elements = [];
	for (let i = 0; i < visibleColors; i++){
		elements.push(<ColorBox key={`color-${i}`} color={colors[i]} />);

		// Add ContrastBox between ColorBoxes if there is a next Color
		if(i < visibleColors - 1){
			elements.push(
				<ContrastBox
					key={`contrast-${i}`}
					leftColor={colors[i]}
					rightColor={colors[i + 1]}
				/>
			);
		}
	}
	return elements;
  }


  return (
    <div className="container">
        <div className="card">
            <h2>How many colors?</h2>
            <ColorSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <h2>What contrast ratio?</h2>
            <ContrastSelect selectedContrast={selectedContrast} setSelectedContrast={setSelectedContrast} />
        </div>
        <div className="card">
            <h2>Which colors?</h2>
            <ColorPickerList
				colors={colors}
				handleColorChange={handleColorChange}
				visibleColors={visibleColors}
			/>
        </div>
        <div className="card">
            <h2>The palette</h2>
			<div className="color-box-container">
            	{renderColorAndContrastBoxes()}
			</div>
        </div>
    </div>
  )
}

export default CardGrid