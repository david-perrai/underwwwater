export default {
    colorScheme: {
        dark: {
            root: {
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.6)",
                borderRadius: "16px",
            },
        },
    },
    css: `
		.p-chip {
			cursor: pointer;
			transition: all 0.2s ease;
			user-select: none;
			border: 1px solid rgba(255, 255, 255, 0.05) !important;
			font-size: 14px !important;
		}

		.p-chip:hover {
			background: rgba(255, 255, 255, 0.08) !important;
			border-color: rgba(255, 255, 255, 0.1) !important;
		}

		.p-chip.is-selected {
			background: rgba(0, 255, 239, 0.15) !important;
			border-color: rgba(0, 255, 239, 0.3) !important;
			color: #00FFEF !important;
			font-weight: 500;
		}
		
		/* Environment specific selected state */
		.diving-environments .p-chip.is-selected {
			background: rgba(0, 196, 180, 0.15) !important;
			border-color: rgba(0, 196, 180, 0.3) !important;
			color: #00c4b4 !important;
		}
	`,
};
