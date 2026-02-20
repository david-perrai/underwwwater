import type { SplitButtonDesignTokens } from "@primeuix/themes/types/splitbutton";

export default {
    colorScheme: {
        dark: {
            root: {
                borderRadius: "6px",
            },
            button: {
                borderRadius: "6px 0 0 6px",
            },
            menuButton: {
                borderRadius: "0 6px 6px 0",
                width: "32px",
            }
        }
    },
    css: `
        .p-splitbutton {
            display: inline-flex;
            vertical-align: middle;
        }
        .p-splitbutton-button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0 none;
        }
        .p-splitbutton-menubutton {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        .p-splitbutton .p-button {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }
    `
} as SplitButtonDesignTokens;
