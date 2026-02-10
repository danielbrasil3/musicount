const STATIC_CACHE = "musicount-static-v3"
const IMAGE_CACHE = "musicount-images-v3"
const OFFLINE_URL = "/offline"

const PRECACHE_URLS = ["/", OFFLINE_URL, "/icon.png", "/ENSAIO.jpg"]

// URLs de imagens para fazer precache
const IMAGE_PRECACHE_URLS = [
  "/instruments/acordeon.webp",
  "/instruments/baritono-vertical.webp",
  "/instruments/clarinete-alto.webp",
  "/instruments/clarinete-baixo.webp",
  "/instruments/clarinete.webp",
  "/instruments/corne-ingles.webp",
  "/instruments/cornet.webp",
  "/instruments/eufonio.webp",
  "/instruments/fagote.webp",
  "/instruments/flauta.webp",
  "/instruments/flugelhorn.webp",
  "/instruments/oboe-damore.webp",
  "/instruments/oboe.webp",
  "/instruments/sax-alto.webp",
  "/instruments/sax-baritono.webp",
  "/instruments/sax-soprano-curvo.webp",
  "/instruments/sax-soprano.webp",
  "/instruments/sax-tenor.webp",
  "/instruments/trombone.webp",
  "/instruments/trombonito.webp",
  "/instruments/trompa.webp",
  "/instruments/trompete.webp",
  "/instruments/tuba.webp",
  "/instruments/viola.webp",
  "/instruments/violino.webp",
  "/instruments/violoncelo.webp",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
      // Fazer precache das imagens durante a instalação
      caches.open(IMAGE_CACHE).then((cache) => {
        // Se as imagens não estiverem disponíveis na instalação, tenta fazer cache
        // de forma não-bloqueante (se falhar, não quebra a instalação)
        cache.addAll(IMAGE_PRECACHE_URLS).catch(() => {
          console.log("Algumas imagens não puderam ser cacheadas na instalação, serão cacheadas sob demanda")
        })
      })
    ])
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, IMAGE_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)

  if (url.origin !== self.location.origin) return

  // Estratégia cache-first para imagens
  if (url.pathname.startsWith("/instruments/") || url.pathname === "/ENSAIO.jpg") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        // Tenta servir do cache primeiro
        const cached = await cache.match(event.request)
        if (cached) return cached

        try {
          // Se não estiver em cache, busca da rede
          const response = await fetch(event.request)
          if (response && response.status === 200) {
            // Cache a imagem para próximas vezes
            cache.put(event.request, response.clone())
          }
          return response
        } catch {
          // Se falhar e não tiver cache, retorna resposta vazia bem formatada
          return new Response(new Blob(), {
            status: 404,
            statusText: "Not Found",
            headers: { "Content-Type": "image/webp" }
          })
        }
      })
    )
    return
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { timeout: 5000 })
        .then((response) => {
          if (!response || response.status !== 200) {
            return caches.match(event.request).then((cached) => {
              return cached || response
            })
          }

          const clone = response.clone()
          caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(async () => {
          const cached = await caches.match(event.request)
          if (cached) return cached

          if (url.pathname !== "/" && url.pathname !== OFFLINE_URL) {
            return caches.match(OFFLINE_URL)
          }

          return caches.match("/")
        })
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) {
          return response
        }

        const responseClone = response.clone()

        caches.open(STATIC_CACHE).then((cache) => {
          cache.put(event.request, responseClone)
        })

        return response
      }).catch(() => {
        return cached || new Response(new Blob(), { status: 404 })
      })
    })
  )
})


