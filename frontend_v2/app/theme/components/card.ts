export default {
    colorScheme: {
        dark: {
            root: {
                background: "rgba(5, 10, 32, 0.6)",
                borderRadius: "12px",
                color: "#ffffff",
                shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    css: `
        .p-card {
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 255, 239, 0.2);
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .p-card:hover {
            border-color: rgba(0, 255, 239, 0.4);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
        }
        .p-card .p-card-body {
            padding: 2rem;
        }
        .p-card .p-card-content {
            padding: 0;
        }
    `,
};
