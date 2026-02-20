import type { ButtonDesignTokens } from "@primeuix/themes/types/button";

export default {
    colorScheme: {
        dark: {
            root: {
                borderRadius: "6px",
                paddingX: "12px",
                paddingY: "8px",
                primary: {
                    background: "{primary.500}",
                    color: "#000000",
                    borderColor: "{primary.500}",
                    hoverBackground: "{primary.200}",
                    hoverBorderColor: "{primary.200}",
                    hoverColor: "#000000",
                    activeBackground: "{primary.200}",
                    activeBorderColor: "{primary.200}",
                    activeColor: "#000000",
                },
                secondary: {
                    background: "{secondary.500}",
                    color: "#ffffff",
                    borderColor: "{secondary.500}",
                    hoverBackground: "{secondary.400}",
                    hoverBorderColor: "{secondary.400}",
                    hoverColor: "#ffffff",
                    activeBackground: "{secondary.400}",
                    activeBorderColor: "{secondary.400}",
                    activeColor: "#ffffff",
                },
                success: {
                    background: "{success.600}",
                    color: "#000000",
                    borderColor: "{success.600}",
                    hoverBackground: "{success.200}",
                    hoverBorderColor: "{success.200}",
                    hoverColor: "#000000",
                    activeBackground: "{success.200}",
                    activeBorderColor: "{success.200}",
                    activeColor: "#000000",
                },
                info: {
                    background: "{info.500}",
                    color: "#000000",
                    borderColor: "{info.500}",
                    hoverBackground: "{info.200}",
                    hoverBorderColor: "{info.200}",
                    hoverColor: "#000000",
                    activeBackground: "{info.200}",
                    activeBorderColor: "{info.200}",
                    activeColor: "#000000",
                },
                warn: {
                    background: "{warn.500}",
                    color: "#000000",
                    borderColor: "{warn.500}",
                    hoverBackground: "{warn.200}",
                    hoverBorderColor: "{warn.200}",
                    hoverColor: "#000000",
                    activeBackground: "{warn.200}",
                    activeBorderColor: "{warn.200}",
                    activeColor: "#000000",
                },
                danger: {
                    background: "{danger.400}",
                    color: "#000000",
                    borderColor: "{danger.400}",
                    hoverBackground: "{danger.200}",
                    hoverBorderColor: "{danger.200}",
                    hoverColor: "#000000",
                    activeBackground: "{danger.200}",
                    activeBorderColor: "{danger.200}",
                    activeColor: "#000000",
                },
            },
            outlined: {
                primary: {
                    color: "{primary.500}",
                    borderColor: "{primary.500}",
                    hoverBackground: "{primary.900}",
                },
                secondary: {
                    color: "{secondary.400}",
                    borderColor: "{secondary.400}",
                    hoverBackground: "{secondary.900}",
                },
                success: {
                    color: "{success.500}",
                    borderColor: "{success.500}",
                    hoverBackground: "{success.900}",
                },
                info: {
                    color: "{info.500}",
                    borderColor: "{info.500}",
                    hoverBackground: "{info.900}",
                },
                warn: {
                    color: "{warn.500}",
                    borderColor: "{warn.500}",
                    hoverBackground: "{warn.900}",
                },
                danger: {
                    color: "{danger.400}",
                    borderColor: "{danger.400}",
                    hoverBackground: "{danger.900}",
                },
            },
            text: {
                primary: {
                    color: "{primary.500}",
                    hoverBackground: "{primary.900}",
                },
                secondary: {
                    color: "{secondary.400}",
                    hoverBackground: "{secondary.800}",
                },
                success: {
                    color: "{success.500}",
                    hoverBackground: "{success.900}",
                },
                info: {
                    color: "{info.500}",
                    hoverBackground: "{info.900}",
                },
                warn: {
                    color: "{warn.500}",
                    hoverBackground: "{warn.900}",
                },
                danger: {
                    color: "{danger.400}",
                    hoverBackground: "{danger.900}",
                },
            },
            link: {
                color: "{primary.500}",
                hoverColor: "{primary.200}",
            },
        },
    },
    css: `
        .p-button, .p-button-label {
            font-family: 'Inter Tight', sans-serif !important;
            font-size: 16px !important;
        }
    `,
} as ButtonDesignTokens;
