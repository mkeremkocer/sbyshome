# Ajan Ana Sayfası

Üç ajanın (**SPKPY**, **SPMO**, **SPY**) avatar kartı olarak sunulduğu platform ana sayfası.
Bir avatarın **üzerine gelindiğinde** (mobilde dokunulduğunda) kart öne çıkar ve
**alt başlıklar sekme olarak açılır**. Her avatar ve her sekme, sizin tanımlayacağınız
**bağlantıya** yönlendirir.

Statik bir site — derleme adımı, paket yöneticisi veya çalışma zamanı bağımlılığı yoktur.
nginx ile konteyner içinde servis edilir.

---

## Docker ile çalıştırma

```bash
docker compose up -d --build
```

Sonra tarayıcıda: **http://localhost:8080**

Durdurmak için:

```bash
docker compose down
```

### Port değiştirme

Varsayılan port 8080. Değiştirmek için depo kökünde bir `.env` dosyası oluşturun:

```bash
cp .env.example .env
# .env içinde: PORT=9000
docker compose up -d
```

### İçeriği yeniden kurmadan güncelleme

`data/` klasörü konteynere bağlı (bind mount) olarak açılır. Yani `data/agents.js` veya
`data/site.js` dosyasını düzenleyip **sayfayı yenilemeniz yeterlidir** — imajı yeniden
kurmanız gerekmez. Bu dosyalar ayrıca önbelleğe alınmaz.

HTML, CSS veya JS değiştirdiyseniz imajı yenileyin:

```bash
docker compose up -d --build
```

### Compose kullanmadan

```bash
docker build -t ajan-ana-sayfasi .
docker run -d --name ajan-ana-sayfasi -p 8080:80 ajan-ana-sayfasi
```

### Sağlık kontrolü

Konteyner `/healthz` ucundan sağlık kontrolü yapar:

```bash
curl http://localhost:8080/healthz   # -> ok
docker compose ps                    # STATUS sütununda (healthy) görünür
```

### Docker olmadan

`index.html` dosyasını doğrudan tarayıcıda açabilirsiniz; ya da:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

---

## Bağlantıları nereye yazacaksınız

Tüm içerik `data/` klasöründeki iki dosyadan yönetilir. Kod dosyalarına dokunmanıza gerek yok.

### 1. Avatarlar — `data/agents.js`

| Alan | Ne işe yarar |
|---|---|
| `name` | Kart üzerindeki isim (SPKPY / SPMO / SPY) |
| `role` | İsim altındaki italik unvan. **Boş bırakılırsa satır hiç görünmez.** |
| `ground` | Kartın koyu gövde zemini |
| `accent` | Karta ait vurgu rengi (hale, kenarlık, fotoğraf zemini) |
| `photo` | Avatar görseli. **Yerel dosya** (`assets/img/spy.jpg`) ya da **dış bağlantı** (`https://...jpg`) olabilir. Görsel açılmazsa otomatik yedek avatar çizilir. |
| `link` | **Avatara erişim bağlantısı.** Kart butonu ve sekmeler bu adrese gider. |
| `query` | Yazı kutusuna girilen metnin bağlantıya ekleneceği parametre adı (varsayılan `q`). |
| `summary` | Kart açıklaması. Boş bırakılırsa satır görünmez. |
| `cta` | Buton yazısı |
| `tabs` | **Alt başlıklar.** Üzerine gelince açılan sekmeler. |

Örnek:

```js
{
  id: 'spkpy',
  name: 'SPKPY',
  role: 'Strateji Planlama',                     // isteğe bağlı
  ground: '#0f7a5f',
  accent: '#c2ecdf',
  photo: 'assets/img/spkpy.jpg',                 // veya https://...
  link: 'https://platform.icsunucu.local/spkpy', // <- ERİŞİM BAĞLANTISI buraya
  query: 'q',
  summary: 'Kısa tanıtım metni.',
  cta: 'Aç',
  tabs: [
    {
      label: 'Alt başlık 1',                              // sekme başlığı
      title: 'Alt başlık 1',                              // panel başlığı
      text: 'Panel metni.',
      link: 'https://platform.icsunucu.local/spkpy/rapor' // boşsa avatarın ana bağlantısı kullanılır
    }
  ]
}
```

Sekme sayısı serbesttir; 2'den fazla sekme eklerseniz kartın altındaki noktalar da otomatik artar.

### 2. Sayfa ayarları — `data/site.js`

Marka adı, karşılama metni, sağdaki dairesel kısayollar, sol menü bağlantıları ve footer
bağlantıları buradan düzenlenir. Tanıtım karuselini kapatmak için `onboarding: false` yapın.

> Bağlantısı boş bırakılan her buton pasif görünür (kesik çizgili kenarlık) ve tıklandığında
> hangi dosyadaki hangi alanın doldurulması gerektiğini söyleyen bir bilgi mesajı gösterir.

---

## Renk paleti

Tüm renkler `assets/css/styles.css` başındaki `:root` bloğunda tanımlıdır.

| Değişken | Renk | Kullanım |
|---|---|---|
| `--bg` | `#FBFAF7` | Sayfa zemini |
| `--surface` | `#ffffff` | Panel, kart yüzeyi, yazı kutusu |
| `--ink` | `#1a1917` | Ana metin |
| `--slate` | `#2C3340` | Pasif kart gövdesi, ikincil metin |
| `--line` | `#D8DCE3` | Çizgi ve kenarlıklar |
| `--mint-1` | `#c2ecdf` | Rampa 1 — SPKPY vurgusu, kısayol degradesi |
| `--mint-2` | `#7dd0b6` | Rampa 2 — SPMO vurgusu, odak kenarlığı |
| `--green-3` | `#2aa78e` | Rampa 3 — SPY vurgusu, başlık degradesi |
| `--green-4` | `#0f7a5f` | Rampa 4 — SPKPY gövdesi, odak halkası |
| `--green-5` | `#063d2f` | Rampa 5 — SPMO gövdesi, bildirim baloncuğu |

Kart başına iki renk kullanılır: koyu zemin (`ground`) ve vurgu (`accent`).

| Ajan | Zemin | Vurgu |
|---|---|---|
| SPKPY | `#0f7a5f` | `#c2ecdf` |
| SPMO | `#063d2f` | `#7dd0b6` |
| SPY | `#2C3340` | `#2aa78e` |

---

## Davranış

- **Üzerine gelme / odak:** Avatarın üzerine gelindiğinde kart öne çıkar, diğerleri kararır ve alt başlıklar açılır.
- **Dokunmatik:** Mobilde karta dokunmak aynı işlevi görür.
- **Klavye:** Kartlar arasında `←` `→`, sekmeler arasında yine `←` `→` ile gezilir; `Tab` ile odaklanan kart otomatik açılır.
- **Yazı kutusu:** Girilen metin, seçili ajanın bağlantısına `?q=...` olarak eklenip yeni sekmede açılır.
- **Tanıtım karuseli:** İlk girişte açılır, aktif kart her zaman ortada durur. "Bunu bir daha gösterme" seçildiğinde tarayıcıda saklanır (`localStorage`) ve bir daha açılmaz. Sol menüdeki **Yeni Sohbet** ile tekrar açılabilir.
- **Düzen sabitliği:** Sekmeler açılırken sayfanın zıplamaması için en yüksek kart yüksekliği önceden rezerve edilir.

---

## Dosya yapısı

```
index.html                   Sayfa iskeleti
assets/css/styles.css        Tüm stiller ve renk paleti
assets/js/app.js             Kart oluşturma, sekmeler, karusel, bağlantı yönlendirme
assets/img/                  Yer tutucu avatarlar (kendi görsellerinizle değiştirin)
data/agents.js               AVATARLAR VE BAĞLANTILAR
data/site.js                 Sayfa metinleri, kısayollar, footer
Dockerfile                   nginx tabanlı imaj
docker-compose.yml           Servis tanımı, port ve bind mount
docker/nginx.conf            Sunucu bloğu, önbellek ve sağlık kontrolü
docker/security-headers.conf Ortak güvenlik başlıkları
.env.example                 PORT değişkeni örneği
```
