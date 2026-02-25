export default {
    colorScheme: {
        dark: {
            root: {
                background:       "rgba(3, 8, 28, 0.55)",
                borderColor:      "rgba(90, 113, 188, 0.35)",
                color:            "#e8eeff",
                borderRadius:     "8px",
                hoverBorderColor: "rgba(0, 196, 180, 0.5)",
                focusBorderColor: "{teal.500}",
            },
            panel: {
                background:   "rgba(3, 8, 28, 0.97)",
                borderColor:  "rgba(0, 196, 180, 0.18)",
                color:        "#e8eeff",
                borderRadius: "10px",
                shadow:       "0 12px 40px rgba(0, 0, 0, 0.6)",
            },
            header: {
                background: "transparent",
                borderColor:"rgba(0, 196, 180, 0.1)",
                color:      "#e8eeff",
                padding:    "0.75rem 0.75rem",
            },
            title: {
                color:      "{teal.400}",
                hoverColor: "{teal.300}",
                fontWeight: "600",
            },
            date: {
                color:              "#c5d0f7",
                hoverBackground:    "rgba(0, 196, 180, 0.1)",
                hoverColor:         "{teal.300}",
                selectedBackground: "{teal.500}",
                selectedColor:      "#ffffff",
                borderRadius:       "6px",
            },
            today: {
                color:      "{teal.400}",
                background: "rgba(0, 196, 180, 0.08)",
            },
        },
    },
    css: `
        .p-datepicker-panel {
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 196, 180, 0.18);
        }
        .p-datepicker-day-selected {
            box-shadow: 0 0 10px rgba(0, 196, 180, 0.3);
        }
    `,
};
