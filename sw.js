// オフラインでも遊べるように、最初に全ファイルを保存しておく
const V = "mjs-v12";
const FOODS = ["blueberry","bread","carrot","cheese","chicken","egg","fish","flour","lemon","lettuce","lime","milk","noodles",
  "nori","oil","onion","orange","patty","plum","potato","red_bean","rice","sausage","soy_sauce","strawberry","tomato"];
const FILES = ["./", "index.html", "manifest.json", "img/icon.png", "img/icon192.png", "img/hazure_minus.png", "img/hazure_none.png",...["naoki", "keigo", "ryu", "shu"].map(c => "img/chars/" + c + ".png"),...FOODS.map(f => "img/" + f + ".png"),
  ...["bgm", "pair", "flip", "clear", "start"].map(s => "sound/" + s + ".mp3")];
self.addEventListener("install", e => e.waitUntil(caches.open(V).then(c => c.addAll(FILES))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
