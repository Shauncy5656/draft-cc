const CACHE='fdcc-v1-12';
const ASSETS=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',x));return r;}).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
