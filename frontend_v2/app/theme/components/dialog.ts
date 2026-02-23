export default {
    colorScheme: {
        dark: {
            root: {
                background: "rgba(5, 10, 32, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                borderRadius: "12px",
            },
            header: {
                background: "transparent",
                color: "#ffffff",
                padding: "1.5rem 1.5rem 0 1.5rem",
            },
            content: {
                background: "transparent",
                color: "#ffffff",
                padding: "1.5rem",
            },
            footer: {
                background: "transparent",
                color: "#ffffff",
                padding: "0 1.5rem 1.5rem 1.5rem",
            },
        },
    },
    css: `
        .p-dialog {
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            width: 70rem;
            max-width: 90vw;
        }
        .p-dialog-content {
            overflow-y: auto;
        }
        .p-dialog .p-dialog-header .p-dialog-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
        }
        .p-dialog .p-dialog-header .p-dialog-header-actions .p-dialog-header-action {
            color: #ffffff;
            transition: color 0.15s ease;
        }
        .p-dialog .p-dialog-header .p-dialog-header-actions .p-dialog-header-action:hover {
            color: rgba(255, 255, 255, 0.7);
            background: rgba(255, 255, 255, 0.1);
        }
    `,
};
