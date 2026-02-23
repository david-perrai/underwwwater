export default {
    colorScheme: {
        dark: {
            legend: {
                background: "transparent",
                color: "#ffffff",
                borderWidth: "0",
                padding: "0 0.5rem",
            },
            root: {
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
            },
        },
    },
    css: `
        .p-fieldset {
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            background: rgba(255, 255, 255, 0.02);
        }
        .p-fieldset .p-fieldset-legend {
            font-family: 'Inter Tight', sans-serif;
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.6) !important;
        }
    `,
};
