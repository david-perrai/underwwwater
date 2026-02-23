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
            closeButton: {
                color: "#ffffff",
                hoverColor: "rgba(255, 255, 255, 0.7)",
                hoverBackground: "rgba(255, 255, 255, 0.1)",
            },
        },
    },
    css: `
        .p-dialog {
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            width: 750px;
            max-width: 90vw;
        }
        .p-dialog-content {
            overflow-y: auto;
        }
        .p-dialog-header {
            justify-content: center;
            position: relative;
        }
        .p-dialog-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            text-align: center;
            width: 100%;
        }
        .p-dialog-header-actions {
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
        }
        .p-dialog-close-button {
            color: #ffffff !important;
            transition: color 0.15s ease, background-color 0.15s ease;
        }
        .p-dialog-close-button:hover {
            color: rgba(255, 255, 255, 0.7) !important;
            background: rgba(255, 255, 255, 0.1) !important;
        }
    `,
};
