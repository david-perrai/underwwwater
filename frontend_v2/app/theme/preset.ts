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
import { primitives } from "./primitives";

// Custom preset with your brand colors
export const CustomPreset = definePreset(Aura, {
    primitive: {
        fontFamily: "'Inter Tight', sans-serif",
        ...primitives,
    },
    semantic: {
        primary: {
            50: "{turquoise.50}",
            100: "{turquoise.100}",
            200: "{turquoise.200}",
            300: "{turquoise.300}",
            400: "{turquoise.400}",
            500: "{turquoise.500}",
            600: "{turquoise.600}",
            700: "{turquoise.700}",
            800: "{turquoise.800}",
            900: "{turquoise.900}",
            950: "{turquoise.950}",
        },
        success: {
            50: "{green.50}",
            100: "{green.100}",
            200: "{green.200}",
            300: "{green.300}",
            400: "{green.400}",
            500: "{green.500}",
            600: "{green.600}",
            700: "{green.700}",
            800: "{green.800}",
            900: "{green.900}",
            950: "{green.950}",
        },
        danger: {
            50: "{red.50}",
            100: "{red.100}",
            200: "{red.200}",
            300: "{red.300}",
            400: "{red.400}",
            500: "{red.500}",
            600: "{red.600}",
            700: "{red.700}",
            800: "{red.800}",
            900: "{red.900}",
            950: "{red.950}",
        },
        warn: {
            50: "{yellow.50}",
            100: "{yellow.100}",
            200: "{yellow.200}",
            300: "{yellow.300}",
            400: "{yellow.400}",
            500: "{yellow.500}",
            600: "{yellow.600}",
            700: "{yellow.700}",
            800: "{yellow.800}",
            900: "{yellow.900}",
            950: "{yellow.950}",
        },
        info: {
            50: "{blue.50}",
            100: "{blue.100}",
            200: "{blue.200}",
            300: "{blue.300}",
            400: "{blue.400}",
            500: "{blue.500}",
            600: "{blue.600}",
            700: "{blue.700}",
            800: "{blue.800}",
            900: "{blue.900}",
            950: "{blue.950}",
        },
        secondary: {
            50: "{navy.50}",
            100: "{navy.100}",
            200: "{navy.200}",
            300: "{navy.300}",
            400: "{navy.400}",
            500: "{navy.500}",
            600: "{navy.600}",
            700: "{navy.700}",
            800: "{navy.800}",
            900: "{navy.900}",
            950: "{navy.950}",
        },
        white: "#ffffff",
        black: "#000000",
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
    },
});
