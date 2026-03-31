export default {
	colorScheme: {
		dark: {
			root: {
				color: "rgba(165, 180, 240, 0.6)",
				focusColor: "{teal.400}",
				activeColor: "{teal.400}",
				invalidColor: "{coral.400}",
			},
		},
	},
	css: `
		.p-floatlabel label {
			font-size: 0.875rem;
			font-weight: 400;
			letter-spacing: 0.01em;
			transition: all 0.2s ease;
		}
		.p-floatlabel:has(input:focus) label,
		.p-floatlabel:has(input.p-filled) label,
		.p-floatlabel:has(.p-inputwrapper-filled) label,
		.p-floatlabel:has(.p-inputwrapper-focus) label {
			font-size: 0.75rem;
			font-weight: 500;
		}
		.p-floatlabel > .p-component,
		.p-floatlabel > .p-inputwrapper {
			width: 100%;
		}
	`,
} as any; // Using any as I don't have the exact type for FloatLabel tokens easily accessible or it might be easier
