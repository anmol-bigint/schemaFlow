import { useState } from "react";

export function useResizer(initial = 40) {
  const [leftWidth, setLeftWidth] = useState(initial);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (e) => {
      const newWidth =
        startWidth + ((e.clientX - startX) / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { leftWidth, handleMouseDown };
}
