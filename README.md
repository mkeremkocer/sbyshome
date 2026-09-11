# Ajan Ana Sayfası

3 avatar kartının yer aldığı platform ana sayfası. Bir avatarın **üzerine gelindiğinde**
(mobilde dokunulduğunda) kart öne çıkar ve **alt başlıklar sekme olarak açılır**.
Her avatar ve her sekme, sizin tanımlayacağınız **bağlantıya** yönlendirir.

Kurulum gerektirmez: `index.html` dosyasını tarayıcıda açmak yeterlidir.
Derleme adımı, paket yöneticisi veya bağımlılık yoktur.

---

## Nasıl açılır

**En kolay yol:** Depoyu indirin, `index.html` dosyasına çift tıklayın.

```bash
git clone https://github.com/mkeremkocer/sbyshome.git
cd sbyshome
git checkout claude/platform-homepage-avatars-5x8kva
```

Sonra `index.html` dosyasını tarayıcıda açın. Yerel sunucu ile çalıştırmak isterseniz:

```bash
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```

**GitHub Pages ile yayınlamak için:** Depo ayarlarında Settings → Pages → Source olarak
bu dalı seçin. Adres `https://mkeremkocer.github.io/sbyshome/` olur.

---

## Bağlantıları nereye yazacaksınız

Tüm içerik `data/` klasöründeki iki dosyadan yönetilir. Kod dosyalarına dokunmanıza gerek yok.

### 1. Avatarlar — `data/agents.js`

| Alan | Ne işe yarar |
|---|---|
| `name` | Kart üzerindeki isim |
| `role` | İsim altındaki italik unvan |
| `photo` | Avatar görseli. **Yerel dosya** (`assets/img/nash.jpg`) ya da **dış bağlantı** (`https://...jpg`) olabilir. Görsel açılmazsa otomatik yedek avatar çizilir. |
| `link` | **Avatara erişim bağlantısı.** Kart butonu ve sekmeler bu adrese gider. |
| `query` | Alt taraftaki yazı kutusuna girilen metnin bağlantıya ekleneceği parametre adı (varsayılan `q`). |
| `accent` | Kartın vurgu rengi |
| `summary` | Kart açıklaması |
| `cta` | Buton yazısı |
| `tabs` | **Alt başlıklar.** Üzerine gelince açılan sekmeler. |

Örnek:

```js
{
  id: 'nash',
  name: 'Nash',
  role: 'Rekabet Analizi Yöneticisi',
  accent: '#2563ff',
  photo: 'https://cdn.ornek.com/nash.jpg',      // <- avatar görseli (bağlantı da olabilir)
  link: 'https://platform.ornek.com/ajan/nash', // <- ERİŞİM BAĞLANTISI buraya
  query: 'q',
  summary: 'Rekabet ortamına dair kapsamlı içgörüler sunar.',
  cta: 'İlham ver',
  tabs: [
    {
      label: 'Rakip Karnesi',                        // sekme başlığı
      title: 'Rakip karnesi',                        // panel başlığı
      text: 'Büyüme, pazar payı ve kârlılık...',     // panel metni
      link: 'https://platform.ornek.com/nash/karne'  // boş bırakılırsa avatarın ana bağlantısı kullanılır
    }
  ]
}
```

Sekme sayısı serbesttir; 2'den fazla sekme eklerseniz kartın altındaki noktalar da otomatik artar.

### 2. Sayfa ayarları — `data/site.js`

Marka adı, karşılama metni, sağdaki dairesel kısayollar, sol menü bağlantıları ve footer
bağlantıları buradan düzenlenir. Tanıtım karuselini kapatmak için `onboarding: false` yapın.

> Bağlantısı boş bırakılan her buton pasif görünür ve tıklandığında hangi dosyadaki
> hangi alanın doldurulması gerektiğini söyleyen bir bilgi mesajı gösterir.

---

## Davranış

- **Üzerine gelme / odak:** Avatarın üzerine gelindiğinde kart öne çıkar, diğerleri kararır ve alt başlıklar açılır.
- **Dokunmatik:** Mobilde karta dokunmak aynı işlevi görür.
- **Klavye:** Kartlar arasında `←` `→`, sekmeler arasında yine `←` `→` ile gezilir; `Tab` ile odaklanan kart otomatik açılır.
- **Yazı kutusu:** Girilen metin, seçili ajanın bağlantısına `?q=...` olarak eklenip yeni sekmede açılır.
- **Tanıtım karuseli:** İlk girişte açılır. "Bunu bir daha gösterme" seçildiğinde tarayıcıda saklanır (`localStorage`) ve bir daha açılmaz. Sol menüdeki **Yeni Sohbet** ile tekrar açılabilir.
- **Düzen sabitliği:** Sekmeler açılırken sayfanın zıplamaması için en yüksek kart yüksekliği önceden rezerve edilir.

---

## Dosya yapısı

```
index.html              Sayfa iskeleti
assets/css/styles.css   Tüm stiller
assets/js/app.js        Kart oluşturma, sekmeler, karusel, bağlantı yönlendirme
assets/img/             Yer tutucu avatarlar (kendi görsellerinizle değiştirin)
data/agents.js          AVATARLAR VE BAĞLANTILAR
data/site.js            Sayfa metinleri, kısayollar, footer
```

## Yayına alma

Statik dosyalardan oluştuğu için herhangi bir statik barındırmaya (GitHub Pages, Netlify,
Vercel, S3, kendi web sunucunuz) olduğu gibi yüklenebilir.
