import { useState } from "react";

function DraggableCanvas({ children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
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

  return (
    <div
      style={{
        overflow: "hidden",
        width: 600,
        height: 600,
        border: "1px solid #ccc",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          position: "absolute",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default DraggableCanvas;
