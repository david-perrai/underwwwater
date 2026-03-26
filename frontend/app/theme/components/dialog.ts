export default {
	colorScheme: {
		dark: {
			root: {
				background: "rgba(3, 8, 28, 0.96)",
				borderColor: "rgba(0, 196, 180, 0.18)",
				color: "#e8eeff",
				borderRadius: "16px",
			},
			header: {
				background: "transparent",
				color: "#e8eeff",
				padding: "1.75rem 1.75rem 0 1.75rem",
			},
			content: {
				background: "transparent",
				color: "#c5d0f7",
				padding: "1.5rem 1.75rem",
			},
			footer: {
				background: "transparent",
				color: "#c5d0f7",
				padding: "0 1.75rem 1.75rem 1.75rem",
			},
			closeButton: {
				color: "rgba(197, 208, 247, 0.6)",
				hoverColor: "#e8eeff",
				hoverBackground: "rgba(0, 196, 180, 0.1)",
			},
		},
	},
	css: `
		.p-dialog {
			backdrop-filter: blur(24px);
			box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7),
						0 0 0 1px rgba(0, 196, 180, 0.12),
						inset 0 1px 0 rgba(255, 255, 255, 0.04);
			width: 780px;
			max-width: 92vw;
		}
		.p-dialog::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 16px;
			background: linear-gradient(135deg, rgba(0, 196, 180, 0.04) 0%, transparent 60%);
			pointer-events: none;
		}
		.p-dialog-content {
			overflow-y: auto;
		}
		.p-dialog-header {
			justify-content: center;
			position: relative;
			border-bottom: 1px solid rgba(0, 196, 180, 0.1);
			padding-bottom: 1.25rem !important;
		}
		.p-dialog-title {
			font-family: 'Inter Tight', serif;
			font-size: 1.4rem;
			letter-spacing: 0.02em;
			text-align: center;
			width: 100%;
			color: #e8eeff;
			/* Subtle teal text glow */
			text-shadow: 0 0 30px rgba(0, 196, 180, 0.25);
		}
		.p-dialog-header-actions {
			position: absolute;
			right: 1.5rem;
			top: 50%;
			transform: translateY(-50%);
		}
		.p-dialog-close-button {
			border-radius: 6px;
			transition: color 0.2s ease, background-color 0.2s ease;
		}
	`,
};
