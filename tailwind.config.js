/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  // prefix: "",
  //   theme: {
  //     container: {
  //       center: true,
  //       padding: "2rem",
  //       screens: {
  //         "2xl": "1400px",
  //       },
  //     },
  //     extend: {
  //       colors: {
  //         border: "hsl(var(--border))",
  //         input: "hsl(var(--input))",
  //         ring: "hsl(var(--ring))",
  //         background: "hsl(var(--background))",
  //         foreground: "hsl(var(--foreground))",
  //         primary: {
  //           DEFAULT: "hsl(var(--primary))",
  //           foreground: "hsl(var(--primary-foreground))",
  //         },
  //         secondary: {
  //           DEFAULT: "hsl(var(--secondary))",
  //           foreground: "hsl(var(--secondary-foreground))",
  //         },
  //         destructive: {
  //           DEFAULT: "hsl(var(--destructive))",
  //           foreground: "hsl(var(--destructive-foreground))",
  //         },
  //         muted: {
  //           DEFAULT: "hsl(var(--muted))",
  //           foreground: "hsl(var(--muted-foreground))",
  //         },
  //         accent: {
  //           DEFAULT: "hsl(var(--accent))",
  //           foreground: "hsl(var(--accent-foreground))",
  //         },
  //         popover: {
  //           DEFAULT: "hsl(var(--popover))",
  //           foreground: "hsl(var(--popover-foreground))",
  //         },
  //         card: {
  //           DEFAULT: "hsl(var(--card))",
  //           foreground: "hsl(var(--card-foreground))",
  //         },
  //       },
  //       borderRadius: {
  //         lg: "var(--radius)",
  //         md: "calc(var(--radius) - 2px)",
  //         sm: "calc(var(--radius) - 4px)",
  //       },
  //       keyframes: {
  //         "accordion-down": {
  //           from: { height: "0" },
  //           to: { height: "var(--radix-accordion-content-height)" },
  //         },
  //         "accordion-up": {
  //           from: { height: "var(--radix-accordion-content-height)" },
  //           to: { height: "0" },
  //         },
  //       },
  //       animation: {
  //         "accordion-down": "accordion-down 0.2s ease-out",
  //         "accordion-up": "accordion-up 0.2s ease-out",
  //       },
  //     },
  //   },
  //   plugins: [require("tailwindcss-animate")],
  // }

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        slider: {
          "0%": {
            width: "0%",
            marginLeft: "0%",
          },
          "100%": {
            width: "100%",
            marginRight: "100%", // Corrected from marginLeft: '100%'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slider: "slider 5s linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// animate-bounce	animation: linear-increase 5s infinite;

// @keyframes linear-increase {
//   0% {
//     transform: translateX(0%);
//     animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//   }
//   100% {
//     transform: translateX(100%);
//     animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//   }
// }