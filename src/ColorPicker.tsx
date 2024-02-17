type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
  toggleDragEnabled: (isEnabled: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange}) => {
  
  return (
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
    );
    
}

export default ColorPicker;