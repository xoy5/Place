import { useState } from 'react'

const ROWS = 20;
const COLS = 20;
const COLORS =["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

function createGrid(){
  return Array(ROWS).fill(null).map(() => Array(COLS).fill("#ffffff"));
}

function App() {
  const [grid, setGrid] = useState(createGrid());
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(null);

  function paintPixel(row, col) {
    const newGrid = grid.map((r, ri) =>
      r.map((color, ci) => (ri === row && ci === col ? selectedColor : color))
    );
    setGrid(newGrid);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>r/place</h1>
      <div style={{display: "flex", gap: 8, marginBottom: 16, alignItems: "center"}}>
        <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>-</button>
          <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => setZoom(Math.min(5, zoom + 0.1))}>+</button>
      </div>
      {/*Wybor koloru*/}
      <div style={{display: "flex", gap: 8, marginBottom: 16}}> 
        {COLORS.map(color => (
            <div 
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: 32,
              height: 32,
              background: color,
              border: selectedColor === color ? "3px solid blue" : "3px solid #ccc",
              cursor: "pointer",
              borderRadius: 4
            }}
            />
        ))}
      </div>

      <p>Wybrany kolor: <span style={{ color: selectedColor, fontWeight: "bold" }}>{selectedColor}</span></p>

      {/* Mapa pixeli */}
      <div style={{ display: "inline-block", border: "1px solid #ccc" }}>
        {grid.map((row, ri) => (
          <div key={ri} style={{ display: "flex" }}>
            {row.map((color, ci) => (
              <div
                key={ci}
                onClick={() => setSelected({row: ri, col: ci})}
                style={{
                  width: 16 * zoom,
                  height: 16 * zoom,
                  background: color,
                  boxSizing: "border-box",
                  cursor: "crosshair",
                  outline: selected && selected?.row == ri && selected?.col == ci ? "2px solid #5ac" : "1px solid #eee",
                  zIndex: selected && selected?.row == ri && selected?.col == ci ? 1 : 0
                }}
              />
            ))}
          </div>
        ))}
      </div>
      
        {selected && (
          <div style={{ marginTop: 16 }}>
            <p>Zaznaczony pixel: [{selected.row}, {selected.col}]</p>
            <button onClick={() => {
              paintPixel(selected.row, selected.col);
              setSelected(null);
            }}>
              Postaw pixel
            </button>
          </div>
        )}
    </div>
  );
}

export default App;
