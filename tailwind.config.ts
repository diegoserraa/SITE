import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        // marca ZDM — casca do site (cabeçalho, rodapé, página Home, textos
        // da MyMaq): reage ao tema via variável CSS, troca com o botão claro/escuro
        noite: { DEFAULT: "hsl(var(--noite))", 2: "hsl(var(--noite-2))", 3: "hsl(var(--noite-3))" },
        grafite: "hsl(var(--grafite))",
        nevoa: "hsl(var(--nevoa))",
        // "papel" é sempre a ilha clara (seção Soluções), mesmo no tema
        // escuro do site — por isso tem seu próprio tom de destaque, que
        // não depende do fundo geral da página (noite/noite-2)
        papel: { DEFAULT: "hsl(var(--papel))", 2: "hsl(var(--papel-2))" },
        azul: { DEFAULT: "#1F6BFF", n: "#3B82F6" },
        verde: { DEFAULT: "#12B76A", n: "#22C55E" },
        // texto/traço genéricos — "branco no escuro, tinta no claro"
        ink: "hsl(var(--ink))",
        hairline: "hsl(var(--hairline))",
        // marca MyMaq360: o produto tem chrome próprio, sempre escuro (é a
        // "tela do sistema" dentro do site, não a casca) — não reage ao tema
        marinho: { DEFAULT: "#0B1730", 2: "#16244A" },
        mata: "#10A37F",
        sensor: "#2563EB",
      },
      fontFamily: {
        display: ['"Archivo Variable"', '"Archivo"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        grotesk: ['"Space Grotesk Variable"', '"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
