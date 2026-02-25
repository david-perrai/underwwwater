export default {
	colorScheme: {
		dark: {
			root: {
				borderRadius: "6px",
			},
			error: {
				background: "rgba(240, 49, 37, 0.1)",
				borderColor: "{coral.600}",
				color: "{coral.300}",
			},
			warn: {
				background: "rgba(196, 143, 0, 0.1)",
				borderColor: "{amber.600}",
				color: "{amber.300}",
			},
			success: {
				background: "rgba(0, 184, 115, 0.1)",
				borderColor: "{seafoam.600}",
				color: "{seafoam.300}",
			},
			info: {
				background: "rgba(0, 132, 240, 0.1)",
				borderColor: "{electric.600}",
				color: "{electric.300}",
			},
		},
	},
	css: `
		.p-message {
			font-family: 'Inter Tight', sans-serif;
			font-size: 0.82rem;
			border-left: 3px solid;
			padding: 0.35rem 0.6rem;
		}
		.p-message-simple {
			background: transparent !important;
			padding: 0.15rem 0 !important;
			border: none !important;
		}
	`,
};
