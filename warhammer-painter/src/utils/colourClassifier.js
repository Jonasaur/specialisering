/**
 * Hardcoded blueprint matching the visual layout of the chart.
 * Splits each color group into its specific paint type segments.
 */
const PALETTE_ROW_BLUEPRINT = [
  {
    label: "Grays & Blacks",
    segments: [
      { type: "Primer", ids: [182, 39, 105, 42] },
      { type: "Base", ids: [1, 59, 36, 105, 146, 62] },
      { type: "Layer", ids: [168, 2, 45, 152, 141, 176, 150, 137, 63, 129, 44] },
      { type: "Wash", ids: [114] }
    ]
  },
  {
    label: "Reds",
    segments: [
      { type: "Base", ids: [106, 89, 30] },
      { type: "Layer", ids: [183, 61, 181, 108] },
      { type: "Wash", ids: [33] }
    ]
  },
  {
    label: "Oranges",
    segments: [
      { type: "Base", ids: [85] },
      { type: "Layer", ids: [164, 64, 100, 90] },
      { type: "Wash", ids: [67] }
    ]
  },
  {
    label: "Yellows",
    segments: [
      { type: "Base", ids: [16] },
      { type: "Layer", ids: [187, 65, 52] },
      { type: "Wash", ids: [34] }
    ]
  },
  {
    label: "Greens",
    segments: [
      { type: "Base", ids: [32, 46, 48, 35, 174, 149, 83] },
      { type: "Layer", ids: [107, 178, 153, 117, 57, 97, 70, 136, 154, 86, 142] },
      { type: "Wash", ids: [22, 14, 41] }
    ]
  },
  {
    label: "Blues",
    segments: [
      { type: "Base", ids: [30, 87, 162, 98] },
      { type: "Layer", ids: [159, 81, 8, 31, 7, 17, 160, 6, 163, 26] },
      { type: "Wash", ids: [53] }
    ]
  },
  {
    label: "Purples",
    segments: [
      { type: "Base", ids: [43, 109, 185] },
      { type: "Layer", ids: [49, 72, 72] },
      { type: "Wash", ids: [55] }
    ]
  },
  {
    label: "Pinks",
    segments: [
      { type: "Base", ids: [131] },
      { type: "Layer", ids: [58, 119] }
    ]
  },
  {
    label: "Bones & Off-Whites",
    segments: [
      { type: "Base", ids: [189, 133] },
      { type: "Layer", ids: [92, 171, 118, 88] }
    ]
  },
  {
    label: "Flesh Tones",
    segments: [
      { type: "Base", ids: [122, 28, 54, 121] },
      { type: "Layer", ids: [66, 170, 91, 21, 29] },
      { type: "Wash", ids: [123] }
    ]
  },
  {
    label: "Browns & Ochres",
    segments: [
      { type: "Base", ids: [186, 146] },
      { type: "Layer", ids: [188, 157, 158, 18, 139, 165, 51, 47, 75, 20] },
      { type: "Wash", ids: [3, 134] }
    ]
  },
  {
    label: "Metallics",
    segments: [
      { type: "Base", ids: [132, 19, 94, 84, 125] },
      { type: "Layer", ids: [128, 140, 27, 155, 77, 71, 151, 127] }
    ]
  }
];

/**
 * Organizes flat color data into rows, sub-sorted by paint type.
 * @param {Array} flatColorsList - The raw "colors" array from your JSON file.
 * @returns {Array} Nested structure optimized for row-by-type rendering.
 */
export function getOrganizedPalette(flatColorsList) {
  if (!Array.isArray(flatColorsList)) return [];

  const colorMap = new Map(flatColorsList.map(color => [color.id, color]));

  return PALETTE_ROW_BLUEPRINT.map(row => ({
    label: row.label,
    segments: row.segments.map(segment => ({
      type: segment.type,
      colors: segment.ids
        .map(id => colorMap.get(id))
        .filter(Boolean)
    })).filter(segment => segment.colors.length > 0) // Hides a segment if it has no matching items
  }));
}