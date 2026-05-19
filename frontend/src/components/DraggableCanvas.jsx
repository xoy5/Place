import { useState } from "react";
import { PIXEL_SIZE, ROWS, COLS, CANVAS_SIZE } from "../../../shared/constants";

function DraggableCanvas({ children, zoom, onZoom }) {
  const [offset, setOffset] = useState({
    x: (CANVAS_SIZE.width - COLS * PIXEL_SIZE) / 2,
    y: (CANVAS_SIZE.height - ROWS * PIXEL_SIZE) / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  function handleMouseDown(e) {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleWheel(e) {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(5, Math.max(0.1, zoom + delta));

    // mouse position relative to canvas
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // calculate new offset to keep zoom centered on mouse
    const newOffsetX = mouseX - (mouseX - offset.x) * (newZoom / zoom);
    const newOffsetY = mouseY - (mouseY - offset.y) * (newZoom / zoom);

    onZoom(delta);
    setOffset({ x: newOffsetX, y: newOffsetY });
  }

  return (
    <div
      style={{
        overflow: "hidden",
        width: CANVAS_SIZE.width,
        height: CANVAS_SIZE.height,
        border: "1px solid #ccc",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <div
        style={{
          position: "absolute",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default DraggableCanvas;
