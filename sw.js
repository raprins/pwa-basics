const CACHE_STATIC_NAME = 'Statics-v1'
const staticAssets = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json',
    'assets/favicon.ico',
    'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'
]


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => cache.addAll(staticAssets))
            .catch(error => console.log('Installation error'))
    )
})

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(cacheNames => cacheNames.filter(name => name !== CACHE_STATIC_NAME))
            .then(nameToDelete => caches.delete(nameToDelete))
            .then(deleted => console.log('Activation okay'))
            .catch(error => console.log('Activation error', error))
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                return response || fetch(e.request)
            })
    )
})