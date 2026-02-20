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

// Custom preset with your brand colors
export const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "#e6fffd",
            100: "#ccfffb",
            200: "#99fff7",
            300: "#66fff3",
            400: "#33ffef",
            500: "#00FFEF", // $color-turquoise
            600: "#00ccbf",
            700: "#00998f",
            800: "#006660",
            900: "#003330",
            950: "#001a18",
        },
        success: {
            50: "#e6ffee",
            100: "#ccffdd",
            200: "#99ffba",
            300: "#66ff96",
            400: "#33ff73",
            500: "#00FF51", // $color-green
            600: "#00cc41",
            700: "#009931",
            800: "#006620",
            900: "#003310",
            950: "#001a08",
        },
        danger: {
            50: "#ffe6e6",
            100: "#ffcccc",
            200: "#ff9999",
            300: "#ff6666",
            400: "#ff4d4d",
            500: "#FF2A2A", // $color-red
            600: "#cc2222",
            700: "#991919",
            800: "#661111",
            900: "#330808",
            950: "#1a0404",
        },
        warn: {
            50: "#fffce6",
            100: "#fff9cc",
            200: "#fff399",
            300: "#ffed66",
            400: "#ffe733",
            500: "#FFD600", // $color-yellow
            600: "#ccab00",
            700: "#998000",
            800: "#665500",
            900: "#332b00",
            950: "#1a1500",
        },
        info: {
            50: "#e6f9ff",
            100: "#ccf3ff",
            200: "#99e7ff",
            300: "#66dbff",
            400: "#33cfff",
            500: "#00BFFF", // $color-blue
            600: "#0099cc",
            700: "#007399",
            800: "#004d66",
            900: "#002633",
            950: "#001319",
        },
        secondary: {
            50: "#e8ecff",
            100: "#d1d9ff",
            200: "#a3b3ff",
            300: "#758dff",
            400: "#4767ff",
            500: "#244cff", // $color-navy
            600: "#1d3dcc",
            700: "#162e99",
            800: "#0e1e66",
            900: "#070f33",
            950: "#040819",
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
    },
});
