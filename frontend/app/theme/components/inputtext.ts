import type { InputTextDesignTokens } from "@primeuix/themes/types/inputtext";

export default {
	colorScheme: {
		dark: {
			root: {
				background: "rgba(3, 8, 28, 0.55)",
				borderColor: "rgba(90, 113, 188, 0.35)",
				color: "#e8eeff",
				placeholderColor: "rgba(165, 180, 240, 0.45)",
				paddingX: "0.9rem",
				paddingY: "0.7rem",
				borderRadius: "8px",
				hoverBorderColor: "rgba(0, 196, 180, 0.5)",
				focusBorderColor: "{teal.500}",
				invalidBorderColor: "{coral.500}",
			},
		},
	},
	css: `
		.p-inputtext {
			font-size: 0.9375rem !important;
			backdrop-filter: blur(10px);
			transition: border-color 0.2s ease, box-shadow 0.2s ease;
		}
		.p-inputtext:enabled:focus {
			box-shadow: 0 0 0 2px rgba(0, 196, 180, 0.2);
		}
		.p-inputtext:enabled:hover {
			background: rgba(3, 8, 28, 0.65);
		}
		.p-inputtext.p-invalid {
			box-shadow: 0 0 0 2px rgba(240, 49, 37, 0.15);
		}
	`,
} as InputTextDesignTokens;
