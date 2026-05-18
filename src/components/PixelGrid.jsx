function PixelGrid({ grid, zoom, selected, onSelect }) {
  return (
    <div style={{ display: "inline-block", border: "1px solid #ccc" }}>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: "flex" }}>
          {row.map((color, ci) => (
            <div
              key={ci}
              onClick={() => onSelect({ row: ri, col: ci })}
              style={{
                width: 16 * zoom,
                height: 16 * zoom,
                background: color,
                boxSizing: "border-box",
                cursor: "crosshair",
                outline:
                  selected?.row === ri && selected?.col === ci
                    ? "2px solid #5ac"
                    : "1px solid #eee",
                zIndex: selected?.row === ri && selected?.col === ci ? 1 : 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PixelGrid;
