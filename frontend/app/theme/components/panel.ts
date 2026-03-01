export default {
	colorScheme: {
		dark: {
			root: {
				background: "rgba(3, 8, 28, 0.4)",
				borderColor: "rgba(0, 196, 180, 0.15)",
				color: "#c5d0f7",
				borderRadius: "12px",
			},
			header: {
				background: "transparent",
				color: "{surface.50}",
				padding: "1rem 1.25rem",
				borderColor: "rgba(0, 196, 180, 0.12)",
			},
			content: {
				background: "transparent",
				color: "#c5d0f7",
				padding: "1.25rem",
			},
			footer: {
				background: "transparent",
				color: "#c5d0f7",
				padding: "0 1.25rem 1.25rem 1.25rem",
			},
			headerAction: {
				color: "#ffffff",
				hoverColor: "#ffffff",
				hoverBackground: "rgba(255, 255, 255, 0.1)",
				focusRing: {
					color: "rgba(255, 255, 255, 0.2)",
				},
			},
		},
	},
	css: `
    .p-panel {
      backdrop-filter: blur(8px);
      transition: border-color 0.25s ease;
    }
    .p-panel:focus-within {
      border-color: rgba(0, 196, 180, 0.3);
    }
    .p-panel-toggle-button {
      color: #ffffff !important;
      background: #272727 !important;
    }
  `,
};
