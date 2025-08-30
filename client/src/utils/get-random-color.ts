/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColorFromString = (text: string) => {
  const colors = [
    "#2563eb", // blue
    "#0891b2", // cyan/teal
    "#10b981", // emerald/green
    "#84cc16", // lime green
    "#f59e0b", // amber
    "#ef4444", // red
    "#ec4899", // pink
    "#8b5cf6", // violet
    "#6366f1", // indigo
    "#14b8a6", // teal
    "#ec3434ff", // neutral gray
  ];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;

  return colors[hash];
};
