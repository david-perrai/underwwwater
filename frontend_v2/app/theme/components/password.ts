import type { PasswordDesignTokens } from "@primeuix/themes/types/password";

export default {
    colorScheme: {
        dark: {
            overlay: {
                background: "rgba(5, 10, 32, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "1rem",
            },
            meter: {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                height: "4px",
            },
        },
    },
    content: {
        gap: "0.5rem",
    },
} as PasswordDesignTokens;
