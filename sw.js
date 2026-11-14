/* TWF service worker: altijd eerst het netwerk (nieuwste versie), offline terugvallen op cache */
const C='twf-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{ if(res&&res.ok&&!/[?&]nocache=/.test(r.url)){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)).catch(()=>{}) } return res }).catch(()=>caches.match(r).then(m=>m||caches.match('./')))) });
