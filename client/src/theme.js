// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",    // White
    10: "#F6F6F6", 
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",  // Black
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
  neutral: {
    // Define neutral colors
    light: "#e0e0e0",  // Light neutral color
    medium: "#666666", // Medium neutral color
    dark: "#333333",   // Dark neutral color
  },
  loginButton: {
    light: "#d0bdf4",  // Light color for light mode
    dark: "#d0bdf4",   // Same color for dark mode (adjust if needed)
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            text: {
              primary: colorTokens.grey[0],  // White text
            },
            background: {
              default: colorTokens.grey[900],  // Dark grey for background
              alt: colorTokens.grey[800],       // Slightly lighter grey for alt background
            },
            primary: {
              main: colorTokens.loginButton.dark, // Button color in dark mode
            },
            neutral: {
              medium: colorTokens.neutral.medium, // Use the defined neutral medium color
            },
          }
        : {
            text: {
              primary: colorTokens.grey[1000], // Black text
            },
            background: {
              default: colorTokens.grey[0],     // White background
              alt: colorTokens.grey[10],        // Light grey for alt background
            },
            primary: {
              main: colorTokens.loginButton.light, // Button color in light mode
            },
            neutral: {
              medium: colorTokens.neutral.medium, // Use the defined neutral medium color
            },
          }),
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: "1px solid " + colorTokens.grey[400], // Gray border
            borderRadius: "10px", // Optional: Add border radius
            padding: "4px", // Optional: Add padding for better appearance
            // Additional styles can go here
          },
        },
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000], // Heading color
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000],
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000],
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000],
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000],
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
        color: mode === "dark" ? colorTokens.grey[0] : colorTokens.grey[1000],
      },
    },
  };
};
