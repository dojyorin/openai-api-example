import {createVuetify} from "../deps.js";

export default createVuetify({
    theme: {
        defaultTheme: "main",
        themes: {
            "main": {
                dark: false,
                colors: {
                    primary: "#03A9F4",
                    secondary: "#9C27B0",
                    surface: "#FFFFFF",
                    background: "#FFFFFF",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FFC107",
                    error: "#FF5252"
                }
            }
        }
    }
});