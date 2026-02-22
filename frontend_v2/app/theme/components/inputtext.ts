import type { InputTextDesignTokens } from "@primeuix/themes/types/inputtext";

export default {
    colorScheme: {
        dark: {
            root: {
                background: "rgba(5, 10, 32, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                color: "#ffffff",
                paddingX: "1rem",
                paddingY: "0.75rem",
                borderRadius: "4px",
                hoverBorderColor: "rgba(0, 255, 239, 0.5)",
                focusBorderColor: "#00FFEF",
                invalidBorderColor: "#FF2A2A",
            },
        },
    },
    css: `
        .p-inputtext {
            font-family: 'Inter Tight', sans-serif !important;
            font-size: 16px !important;
            backdrop-filter: blur(10px);
        }
        .p-inputtext:enabled:focus {
            box-shadow: 0 0 0 1px var(--p-inputtext-focus-border-color);
        }
    `,
} as InputTextDesignTokens;
