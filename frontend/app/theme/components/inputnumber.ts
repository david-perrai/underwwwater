import type { InputNumberDesignTokens } from "@primeuix/themes/types/inputnumber";

export default {
	colorScheme: {
		dark: {
			root: {
				transitionDuration: "0.15s",
			},
		},
	},
	css: `
		.p-inputnumber,
		.p-inputnumber-input {
			width: 100%;
		}
	`,
} as InputNumberDesignTokens;
