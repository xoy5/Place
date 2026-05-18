function ColorPicker({ colors, selectedColor, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => onSelect(color)}
          style={{
            width: 32,
            height: 32,
            background: color,
            border:
              selectedColor === color ? "3px solid blue" : "3px solid #ccc",
            cursor: "pointer",
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
