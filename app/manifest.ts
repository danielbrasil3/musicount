import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Controle de Ensaios Musicais",
    short_name: "Musicount",
    description: "Sistema de contagem e controle de presença em ensaios musicais",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
