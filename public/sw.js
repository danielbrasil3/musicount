const STATIC_CACHE = "musicount-static-v1"
const IMAGE_CACHE = "musicount-images-v1"
const OFFLINE_URL = "/offline"

const PRECACHE_URLS = ["/", OFFLINE_URL, "/icon.png"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
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

  if (url.pathname.startsWith("/instruments/")) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request)
        if (cached) return cached

        const response = await fetch(event.request)
        if (response && response.status === 200) {
          cache.put(event.request, response.clone())
        }
        return response
      })
    )
    return
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone()
          caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(async () => {
          const cached = await caches.match(event.request)
          return cached || (await caches.match(OFFLINE_URL))
        })
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response
          }

          const responseClone = response.clone()

          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(event.request, responseClone)
          })

          return response
        })
      )
    })
  )

})
