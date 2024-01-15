import React from 'react'
import { renderColorAndContrastBoxes } from './utils'

type FullAccessiblePaletteProps = {
    selectedContrast: number;
    colors: string[];
    visibleColors: number;
} 

const FullAccessiblePalette: React.FC<FullAccessiblePaletteProps> = ({ selectedContrast, colors, visibleColors}) => {
   
  return (
    <div className="adjacent-palette">
      <h2>The Adjacent Color palette with contrast {selectedContrast === 4.5 ? '4.5:1' : '3:1'}</h2>
			<p>This section checks contrast between adjacent colors for clear visualization if stacking colors in e.g charts. <strong>Non-adjacent colors are not compared</strong></p>
      <p>If you want to keep a color in your color palette, but the neighbor color has not enough contrast. Try drag and drop in section 2.</p>
			<div className="color-box-container">
            	{renderColorAndContrastBoxes(colors, visibleColors, selectedContrast)}
		  </div>
    </div>
  )
}

export default FullAccessiblePalette;