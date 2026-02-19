import type { DatePickerDesignTokens } from "@primeuix/themes/types/datepicker";

export default {
    colorScheme: {
        dark: {
            root: {
                transitionDuration: "0.15s",
            },
            panel: {
                background: "rgba(5, 10, 32, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                borderRadius: "4px",
                shadow: "0 4px 12px rgba(0,0,0,0.5)",
            },
            header: {
                background: "transparent",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
            },
            date: {
                hoverBackground: "rgba(0, 255, 239, 0.1)",
                selectedBackground: "#00FFEF",
                selectedColor: "#050A20",
            },
            today: {
                background: "rgba(255, 255, 255, 0.1)",
                color: "#00FFEF",
            },
        },
    },
} as DatePickerDesignTokens;
