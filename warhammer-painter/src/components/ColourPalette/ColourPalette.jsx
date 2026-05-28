import React, { useMemo } from "react";
import rawColorData from "../../assets/Citadel-Colours-189.json";
import { getOrganizedPalette } from "../../utils/colourClassifier";

export default function ColourPalette({ activeColor, setActiveColor }) {
  const structuredRows = useMemo(() => {
    return getOrganizedPalette(rawColorData.colors);
  }, []);

  return (
    <div
      className="palette-container"
      style={{
        // Your exact styles, packaged safely inside the component
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgba(34, 34, 34, 0.95)", // A nice dark mode alpha to match the hex swatches
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        width: "400px",
        maxHeight: "100vh",
        overflowY: "auto",
        fontFamily: "sans-serif",
        color: "#fff",
      }}
    >
      {structuredRows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}-${row.label}`}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #444",
            paddingBottom: "12px",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: "1.05rem",
              color: "#ddd",
            }}
          >
            {row.label}
          </h2>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {row.segments.map((segment, segmentIndex) => (
              <div
                key={`segment-${segmentIndex}-${segment.type}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {/* Paint type marker (e.g., BASE, LAYER, WASH) */}
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    color: "#888",
                    textTransform: "uppercase",
                  }}
                >
                  {segment.type}
                </span>

                {/* Swatch alignment block */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {segment.colors.map((color, colorIndex) => {
                    const isSelected = activeColor === color.hex;

                    return (
                      <button
                        key={`${row.label}-${segment.type}-${color.id}-${colorIndex}`}
                        title={`${color.name} (${segment.type})`}
                        onClick={() => setActiveColor(color.hex)}
                        style={{
                          backgroundColor: color.hex,
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          border: isSelected ? "2px solid #fff" : "1px solid #555",
                          transform: isSelected ? "scale(1.1)" : "scale(1)",
                          boxShadow: isSelected ? "0 0 8px rgba(255,255,255,0.6)" : "none",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}