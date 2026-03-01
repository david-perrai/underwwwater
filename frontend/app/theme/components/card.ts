export default {
	colorScheme: {
		dark: {
			root: {
				background: "rgba(3, 10, 32, 0.7)",
				borderRadius: "14px",
				color: "#e8eeff",
				shadow: "0 8px 40px rgba(0, 0, 0, 0.5)",
			},
		},
	},
	css: `
		.p-card {
			backdrop-filter: blur(18px);
			border: 1px solid rgba(0, 196, 180, 0.12);
			transition: border-color 0.25s ease, box-shadow 0.25s ease;
		}
		.p-card:hover {
			border-color: rgba(0, 196, 180, 0.28);
			box-shadow: 0 12px 56px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 196, 180, 0.1);
		}
		.p-card .p-card-body {
			padding: 1.75rem;
		}
		.p-card .p-card-content {
			padding: 0;
		}
		.p-card .p-card-title {
			font-family: 'Playfair Display', serif;
			font-size: 1.2rem;
			color: #e8eeff;
			letter-spacing: 0.01em;
		}
		.p-card .p-card-subtitle {
			color: rgba(165, 180, 240, 0.7);
			font-size: 0.85rem;
		}
	`,
};
