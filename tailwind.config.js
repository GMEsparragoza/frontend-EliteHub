/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#21419c",        // Azul profundo con un tono vibrante
      secondary: "#7823c4",      // Púrpura llamativo para resaltar detalles
      tertiary: "#0EA5E9",       // Azul turquesa vibrante para mayor uso en la UI    
      accent: "#FACC15",         // Amarillo dorado para resaltar elementos clave
      background: "#0F172A",     // Azul oscuro grisáceo para un fondo elegante
      cardBackground: "#1E293B", // Fondo para tarjetas y secciones destacadas
      textPrimary: "#F8FAFC",    // Blanco suave para textos principales
      textSecondary: "#94A3B8",  // Gris azulado para textos secundarios
      border: "#697b94",         // Gris azulado oscuro para bordes sutiles
      highlight: "#14B8A6",      // Verde azulado para elementos interactivos
      error: "#e31717",          // Rojo intenso para errores o advertencias
      detailsError: '#b03e3e',   // Rojo Suave para detalles de errores
      success: "#16A34A",        // Verde vibrante para acciones exitosas
      warning: "#EAB308",        // Amarillo oscuro para alertas
      black: "#000",             // Negro para ciertos aspectos visuales
    }
  },
  plugins: [],
}

