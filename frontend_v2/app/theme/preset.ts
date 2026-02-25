import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Component presets
import button from "./components/button";
import inputtext from "./components/inputtext";
import inputnumber from "./components/inputnumber";
import password from "./components/password";
import datepicker from "./components/datepicker";
import floatlabel from "./components/floatlabel";
import splitbutton from "./components/splitbutton";
import message from "./components/message";
import card from "./components/card";
import dialog from "./components/dialog";
import fieldset from "./components/fieldset";
import menu from "./components/menu";
import panel from "./components/panel";
import chip from "./components/chip";
import { primitives } from "./primitives";

export const CustomPreset = definePreset(Aura, {
	primitive: {
		fontFamily: "'Inter Tight', sans-serif",
		...primitives,
	},

	semantic: {
		// ── Couleurs sémantiques → palettes ORIGINALES ────────────────
		// Utilisées par button.ts via {primary.X}, {success.X}, etc.
		primary: {
			50: "{turquoise.50}", 100: "{turquoise.100}", 200: "{turquoise.200}",
			300: "{turquoise.300}", 400: "{turquoise.400}", 500: "{turquoise.500}",
			600: "{turquoise.600}", 700: "{turquoise.700}", 800: "{turquoise.800}",
			900: "{turquoise.900}", 950: "{turquoise.950}",
		},
		secondary: {
			50: "{navy.50}", 100: "{navy.100}", 200: "{navy.200}",
			300: "{navy.300}", 400: "{navy.400}", 500: "{navy.500}",
			600: "{navy.600}", 700: "{navy.700}", 800: "{navy.800}",
			900: "{navy.900}", 950: "{navy.950}",
		},
		success: {
			50: "{green.50}", 100: "{green.100}", 200: "{green.200}",
			300: "{green.300}", 400: "{green.400}", 500: "{green.500}",
			600: "{green.600}", 700: "{green.700}", 800: "{green.800}",
			900: "{green.900}", 950: "{green.950}",
		},
		danger: {
			50: "{red.50}", 100: "{red.100}", 200: "{red.200}",
			300: "{red.300}", 400: "{red.400}", 500: "{red.500}",
			600: "{red.600}", 700: "{red.700}", 800: "{red.800}",
			900: "{red.900}", 950: "{red.950}",
		},
		warn: {
			50: "{yellow.50}", 100: "{yellow.100}", 200: "{yellow.200}",
			300: "{yellow.300}", 400: "{yellow.400}", 500: "{yellow.500}",
			600: "{yellow.600}", 700: "{yellow.700}", 800: "{yellow.800}",
			900: "{yellow.900}", 950: "{yellow.950}",
		},
		info: {
			50: "{blue.50}", 100: "{blue.100}", 200: "{blue.200}",
			300: "{blue.300}", 400: "{blue.400}", 500: "{blue.500}",
			600: "{blue.600}", 700: "{blue.700}", 800: "{blue.800}",
			900: "{blue.900}", 950: "{blue.950}",
		},

		// ── Color scheme: dark ────────────────────────────────────────
		colorScheme: {
			dark: {
				// Surface scale → palettes OCEAN (abyss)
				// Utilisées automatiquement par tous les composants PrimeVue
				surface: {
					0: "#ffffff",
					50: "{abyss.50}",
					100: "{abyss.100}",
					200: "{abyss.200}",
					300: "{abyss.300}",
					400: "{abyss.400}",
					500: "{abyss.500}",
					600: "{abyss.600}",
					700: "{abyss.700}",
					800: "{abyss.800}",
					900: "{abyss.900}",
					950: "{abyss.950}",
				},

				highlight: {
					background: "rgba(0, 196, 180, 0.12)",
					focusBackground: "rgba(0, 196, 180, 0.2)",
					color: "{teal.300}",
					focusColor: "{teal.200}",
				},

				mask: {
					background: "rgba(1, 4, 16, 0.75)",
					color: "{surface.100}",
				},

				navigation: {
					item: {
						focusBackground: "rgba(0, 196, 180, 0.08)",
						activeBackground: "rgba(0, 196, 180, 0.14)",
						color: "{surface.100}",
						focusColor: "{teal.300}",
						activeColor: "{teal.300}",
						icon: {
							color: "{surface.300}",
							focusColor: "{teal.400}",
							activeColor: "{teal.400}",
						},
					},
					submenuLabel: {
						background: "transparent",
						color: "{surface.300}",
					},
					submenuIcon: {
						color: "{surface.300}",
						focusColor: "{teal.300}",
						activeColor: "{teal.300}",
					},
				},

				formField: {
					background: "rgba(3, 8, 28, 0.55)",
					disabledBackground: "rgba(3, 8, 28, 0.3)",
					filledBackground: "rgba(3, 8, 28, 0.65)",
					filledFocusBackground: "rgba(3, 8, 28, 0.65)",
					borderColor: "rgba(90, 113, 188, 0.35)",
					hoverBorderColor: "rgba(0, 196, 180, 0.5)",
					focusBorderColor: "{teal.500}",
					invalidBorderColor: "{coral.500}",
					color: "{surface.50}",
					disabledColor: "{surface.400}",
					placeholderColor: "rgba(163, 179, 217, 0.45)",
					invalidPlaceholderColor: "{coral.300}",
					floatLabelColor: "{surface.300}",
					floatLabelFocusColor: "{teal.400}",
					floatLabelActiveColor: "{teal.400}",
					floatLabelInvalidColor: "{coral.400}",
					iconColor: "{surface.300}",
					shadow: "none",
					paddingX: "0.9rem",
					paddingY: "0.7rem",
					borderRadius: "8px",
					focusRing: {
						width: "2px",
						style: "solid",
						color: "rgba(0, 196, 180, 0.25)",
						offset: "0",
						shadow: "none",
					},
					transitionDuration: "0.2s",
				},

				text: {
					color: "{surface.50}",
					hoverColor: "{surface.0}",
					mutedColor: "{surface.300}",
					hoverMutedColor: "{surface.200}",
				},

				content: {
					background: "rgba(3, 8, 28, 0.55)",
					hoverBackground: "rgba(0, 196, 180, 0.06)",
					borderColor: "rgba(0, 196, 180, 0.12)",
					color: "{surface.100}",
					hoverColor: "{surface.50}",
				},

				overlay: {
					select: {
						background: "rgba(3, 8, 28, 1)",
						borderColor: "rgba(0, 196, 180, 0.18)",
						borderRadius: "10px",
						color: "{surface.100}",
						shadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
					},
					popover: {
						background: "rgba(3, 8, 28, 1)",
						borderColor: "rgba(0, 196, 180, 0.18)",
						borderRadius: "10px",
						color: "{surface.100}",
						shadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
					},
					modal: {
						background: "rgba(3, 8, 28, 1)",
						borderColor: "rgba(0, 196, 180, 0.18)",
						borderRadius: "16px",
						color: "{surface.50}",
						shadow: "0 24px 80px rgba(0, 0, 0, 0.7)",
					},
					navigation: {
						background: "rgba(3, 8, 28, 1)",
						borderColor: "rgba(0, 196, 180, 0.18)",
						color: "{surface.100}",
						shadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
					},
				},

				list: {
					option: {
						focusBackground: "rgba(0, 196, 180, 0.08)",
						selectedBackground: "rgba(0, 196, 180, 0.15)",
						selectedFocusBackground: "rgba(0, 196, 180, 0.22)",
						color: "{surface.100}",
						focusColor: "{teal.300}",
						selectedColor: "{teal.300}",
						selectedFocusColor: "{teal.200}",
						icon: {
							color: "{surface.300}",
							focusColor: "{teal.400}",
							selectedColor: "{teal.400}",
							selectedFocusColor: "{teal.300}",
						},
					},
					optionGroup: {
						background: "transparent",
						color: "{surface.400}",
					},
					header: {
						background: "rgba(3, 8, 28, 0.8)",
						borderColor: "rgba(0, 196, 180, 0.1)",
						color: "{surface.200}",
						padding: "0.5rem 1rem 0.25rem 1rem",
					},
					padding: "0.25rem 0.25rem",
					gap: "2px",
				},

				dataTable: {
					headerCellBackground: "rgba(2, 6, 20, 0.8)",
					headerCellHoverBackground: "rgba(0, 196, 180, 0.06)",
					headerCellSelectedBackground: "rgba(0, 196, 180, 0.1)",
					headerCellBorderColor: "rgba(0, 196, 180, 0.1)",
					headerCellColor: "{teal.400}",
					headerCellHoverColor: "{teal.300}",
					headerCellSelectedColor: "{teal.300}",
					sortIconColor: "{surface.400}",
					sortIconHoverColor: "{teal.400}",
					rowBackground: "transparent",
					rowHoverBackground: "rgba(0, 196, 180, 0.04)",
					rowSelectedBackground: "rgba(0, 196, 180, 0.1)",
					rowColor: "{surface.100}",
					rowHoverColor: "{surface.50}",
					rowSelectedColor: "{teal.300}",
					borderColor: "rgba(90, 113, 188, 0.15)",
					footerCellBackground: "rgba(2, 6, 20, 0.8)",
					footerCellBorderColor: "rgba(0, 196, 180, 0.1)",
					footerCellColor: "{surface.200}",
				},

				accordion: {
					header: {
						background: "rgba(3, 8, 28, 0.5)",
						hoverBackground: "rgba(0, 196, 180, 0.06)",
						activeBackground: "rgba(0, 196, 180, 0.1)",
						color: "{surface.100}",
						hoverColor: "{surface.50}",
						activeColor: "{teal.300}",
						borderColor: "rgba(0, 196, 180, 0.15)",
						hoverBorderColor: "rgba(0, 196, 180, 0.25)",
						activeBorderColor: "rgba(0, 196, 180, 0.3)",
					},
					content: {
						background: "rgba(3, 8, 28, 0.35)",
						borderColor: "rgba(0, 196, 180, 0.15)",
						color: "{surface.200}",
					},
				},
			},
		},
	},

	components: {
		button,
		inputtext,
		inputnumber,
		password,
		datepicker,
		floatlabel,
		splitbutton,
		message,
		card,
		dialog,
		fieldset,
		menu,
		panel,
		chip,
	},
});