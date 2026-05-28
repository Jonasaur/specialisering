import styles from "./ColourUI.module.css";
import { useMemo } from "react";
import colourData from "../../assets/Citadel-Colours-189.json";
import { getOrganizedPalette } from "../../utils/colourClassifier";

export default function ColourUI({ activeColor, setActiveColor, onPrime }) {
  const structuredRows = useMemo(() => {
    return getOrganizedPalette(colourData.colors);
  }, []);

  return (
    <div className={styles.colourUIContainer}>
      <h2 className={styles.title}>Citadel Colour Palette</h2>
      <div className={styles.primeSection}>
        <button
          className={styles.primeButton}
          onClick={onPrime}
          disabled={!activeColor || typeof activeColor === "string"}
          style={{
            backgroundColor:
              activeColor && activeColor.hex ? activeColor.hex : "white",
          }}
        >
          Prime Model
        </button>
        <span
          style={{ marginLeft: "10px", fontStyle: "italic", color: "#c1c1c1" }}
        >
          {activeColor && activeColor.name ? `with ${activeColor.name}` : ""}
        </span>
      </div>
      {structuredRows.map((row, rowIndex) => (
        <div key={`${row.label}-${rowIndex}`} className={styles.paletteRow}>
          <h4 className={styles.paletteLabel}>{row.label}</h4>
          <div>
            {row.segments.map((segment, segmentIndex) => (
              <div
                key={`${segment.type}-${segmentIndex}`}
                className={styles.segmentContainer}
              >
                <span className={styles.segmentLabel}>{segment.type}</span>
                <div className={styles.swatchContainer}>
                  {segment.colors.map((color, colorIndex) => {
                    const isSelected =
                      activeColor.hex &&
                      activeColor.hex.toLowerCase() === color.hex.toLowerCase();

                    return (
                      <button
                        key={`${row.label}-${segment.type}-${color.id}-${colorIndex}`}
                        title={`${color.name} (${segment.type})`}
                        onClick={() =>
                          setActiveColor({
                            hex: color.hex,
                            name: color.name,
                            isMetallic: row.label === "Metallics",
                          })
                        }
                        style={{
                          backgroundColor: color.hex,
                        }}
                        className={`${styles.colorBox} ${isSelected ? styles.selected : ""}`}
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
