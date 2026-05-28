import styles from "./ColourUI.module.css";
import { useMemo } from "react";
import colourData from "../../assets/Citadel-Colours-189.json";
import { getOrganizedPalette } from "../../utils/colourClassifier";

export default function ColourUI({ activeColor, setActiveColor }) {
  const structuredRows = useMemo(() => {
    return getOrganizedPalette(colourData.colors);
  }, []);

  return (
    <div className={styles.colourUIContainer}>
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
                      activeColor &&
                      activeColor.toLowerCase() === color.hex.toLowerCase();

                    return (
                      <button
                        key={`${row.label}-${segment.type}-${color.id}-${colorIndex}`}
                        title={`${color.name} (${segment.type})`}
                        onClick={() => setActiveColor(color.hex)}
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
