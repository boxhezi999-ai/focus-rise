const CACHE='focus-rise-v6.9';
const ASSETS=['./','./index.html','./styles.css','./theme-gold.css','./app.js','./supabase.min.js','./manifest.webmanifest','./icon.svg','./apple-touch-icon-v44.png','./icon-v44-192.png','./icon-v44-512.png','./rank-01.png','./rank-02.png','./rank-03.png','./rank-04.png','./rank-05.png','./rank-06.png','./rank-07.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('./index.html'))))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list)if('focus' in client)return client.focus();return clients.openWindow('./index.html')}))});
