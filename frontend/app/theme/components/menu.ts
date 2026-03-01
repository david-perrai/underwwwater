export default {
    colorScheme: {
        dark: {
            root: {
                background: "rgba(3, 8, 28, 1)",
                borderColor: "rgba(0, 196, 180, 0.18)",
                color: "{surface.100}",
                borderRadius: "10px",
                shadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
            },
            item: {
                focusBackground: "rgba(0, 196, 180, 0.08)",
                color: "{surface.100}",
                focusColor: "{teal.300}",
                icon: {
                    color: "{surface.300}",
                    focusColor: "{teal.400}",
                },
            },
            submenuLabel: {
                background: "transparent",
                color: "{surface.300}",
            },
        },
    },
    css: `
    .p-menu {
      backdrop-filter: blur(12px);
    }
  `,
};
