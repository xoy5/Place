import { useState } from "react";

import ColorPicker from "./components/ColorPicker";
import PixelGrid from "./components/PixelGrid";
import ButtonPutPixel from "./components/ButtonPutPixel";
import DraggableCanvas from "./components/DraggableCanvas";

const ROWS = 20;
const COLS = 20;
const COLORS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

function createGrid() {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill("#ffffff"));
}

function App() {
  const [grid, setGrid] = useState(createGrid());
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(null);

  function paintPixel(row, col) {
    const newGrid = grid.map((r, ri) =>
      r.map((color, ci) => (ri === row && ci === col ? selectedColor : color)),
    );
    setGrid(newGrid);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>r/place</h1>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>-</button>
        <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => setZoom(Math.min(5, zoom + 0.1))}>+</button>
      </div>

      <ColorPicker
        colors={COLORS}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />

      <p>
        Wybrany kolor:{" "}
        <span style={{ color: selectedColor, fontWeight: "bold" }}>
          {selectedColor}
        </span>
      </p>

      <DraggableCanvas
        zoom={zoom}
        onZoom={(delta) =>
          setZoom((z) => Math.min(5, Math.max(0.1, z + delta)))
        }
      >
        <PixelGrid grid={grid} selected={selected} onSelect={setSelected} />
      </DraggableCanvas>

      <ButtonPutPixel
        selected={selected}
        paintPixel={paintPixel}
        setSelected={setSelected}
      />
    </div>
  );
}

export default App;
