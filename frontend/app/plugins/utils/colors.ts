import colors from "@/scss/_export.module.scss";

/**
 * Custom Plugin Color Library
 */
function getThemeColors() {
  const regex = /^#([0-9a-f]{3}){1,2}$/i;

  for (const key in colors) {
    if (!regex.test(colors[key])) {
      delete colors[key];
    }
  }

  return colors;
}

export const Colors = getThemeColors();
