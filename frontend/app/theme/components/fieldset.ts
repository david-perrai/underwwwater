export default {
	colorScheme: {
		dark: {
			root: {
				background: "rgba(3, 8, 28, 0.4)",
				borderColor: "rgba(0, 196, 180, 0.15)",
				borderRadius: "12px",
				color: "#c5d0f7",
				padding: "1.25rem",
			},
			legend: {
				background: "transparent",
				color: "{teal.400}",
				borderColor: "transparent",
				padding: "0.2rem 0.6rem",
				borderRadius: "6px",
			},
		},
	},
	css: `
		.p-fieldset {
			transition: border-color 0.25s ease;
			backdrop-filter: blur(8px);
		}
		.p-fieldset:focus-within {
			border-color: rgba(0, 196, 180, 0.3);
		}
		.p-fieldset-legend {
			font-family: 'Inter Tight', sans-serif;
			font-size: 0.78rem;
			font-weight: 600;
			letter-spacing: 0.08em;
			text-transform: uppercase;
		}
		.p-fieldset-legend-label {
			color: var(--p-teal-400, #00c4b4);
		}
		.p-fieldset-content {
			padding-top: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}
	`,
} as any;
