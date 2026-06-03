import React from "react";

function Resizer({ onMouseDown }) {
  return (
    <div
      className="w-[3px] bg-gray-900 hover:bg-blue-500/80 cursor-col-resize transition-colors duration-150"
      onMouseDown={onMouseDown}
    />
  );
}

export default Resizer;
