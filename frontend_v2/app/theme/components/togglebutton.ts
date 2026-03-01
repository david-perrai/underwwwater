import type { ToggleButtonDesignTokens } from "@primeuix/themes/types/togglebutton";

export default {
    colorScheme: {
        dark: {
            hoverBackground: "transparent",
            checkedHoverBackground: "rgba(255, 255, 255, 0.05)",
        }
    },
    css: `
    .p-togglebutton {
      border: none;

      span[data-pc-section="label"] {
        display: none;
      }
    }
  `,
} as ToggleButtonDesignTokens;
