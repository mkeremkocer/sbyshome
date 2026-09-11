# Ajan Ana Sayfasi

3 avatar kartinin yer aldigi platform ana sayfasi. Bir avatarin **uzerine gelindiginde**
(mobilde dokunuldugunda) kart one cikar ve **alt basliklar sekme olarak acilir**.
Her avatar ve her sekme, sizin tanimlayacaginiz **linke** yonlendirir.

Kurulum gerektirmez: `index.html` dosyasini tarayicida acmak yeterlidir.
Derleme adimi, paket yoneticisi veya bagimlilik yoktur.

---

## Linkleri nereye yazacaksiniz

Tum icerik `data/` klasorundeki iki dosyadan yonetilir. Kod dosyalarina dokunmaniza gerek yok.

### 1. Avatarlar — `data/agents.js`

Her avatar icin doldurulacak alanlar:

| Alan | Ne ise yarar |
|---|---|
| `name` | Kart uzerindeki isim |
| `role` | Isim altindaki italik unvan |
| `photo` | Avatar gorseli. **Yerel dosya** (`assets/img/nash.jpg`) ya da **dis link** (`https://...jpg`) olabilir. Gorsel acilmazsa otomatik yedek avatar cizilir. |
| `link` | **Avatara erisim linki.** "Inspire me" butonu ve sekmeler bu adrese gider. |
| `query` | Alt taraftaki yazi kutusuna girilen metnin linke eklenecegi parametre adi (varsayilan `q`). |
| `accent` | Kartin vurgu rengi |
| `summary` | Kart aciklamasi |
| `cta` | Buton yazisi |
| `tabs` | **Alt basliklar.** Hover ile acilan sekmeler. |

Ornek:

```js
{
  id: 'nash',
  name: 'Nash',
  role: 'Competitor Analysis Manager',
  accent: '#2563ff',
  photo: 'https://cdn.ornek.com/nash.jpg',     // <- avatar gorseli (link de olabilir)
  link: 'https://platform.ornek.com/ajan/nash', // <- ERISIM LINKI buraya
  query: 'q',
  summary: 'Rekabet ortamina dair kapsamli icgoruler sunar.',
  cta: 'Inspire me',
  tabs: [
    {
      label: 'Rakip Karnesi',                        // sekme basligi
      title: 'Rakip karnesi',                        // panel basligi
      text: 'Buyume, pazar payi ve karlilik...',     // panel metni
      link: 'https://platform.ornek.com/nash/karne'  // bos birakilirsa avatarin ana linki kullanilir
    }
  ]
}
```

Sekme sayisi serbesttir; 2'den fazla sekme eklerseniz kartin altindaki noktalar da otomatik artar.

### 2. Sayfa ayarlari — `data/site.js`

Marka adi, karsilama metni, sag taraftaki dairesel kisayollar, sol menu linkleri ve footer
baglantilari buradan duzenlenir. Tanitim karuselini kapatmak icin `onboarding: false` yapin.

> Link alani bos birakilan her buton "pasif" gorunur ve tiklandiginda hangi dosyadaki
> hangi alanin doldurulmasi gerektigini soyleyen bir bilgi mesaji gosterir.

---

## Davranis

- **Hover / odak:** Avatarin uzerine gelindiginde kart one cikar, digerleri kararir ve alt basliklar acilir.
- **Dokunmatik:** Mobilde karta dokunmak ayni islevi gorur.
- **Klavye:** Kartlar arasinda `←` `→`, sekmeler arasinda yine `←` `→` ile gezilir; `Tab` ile odaklanan kart otomatik acilir.
- **Yazi kutusu:** Girilen metin, secili ajanin linkine `?q=...` olarak eklenip yeni sekmede acilir.
- **Tanitim karuseli:** Ilk girişte acilir. "Don't show me this again" secildiginde tarayicida saklanir (`localStorage`) ve bir daha acilmaz. Sol menudeki **New Chat** ile tekrar acilabilir.
- **Duzen sabitligi:** Sekmeler acilirken sayfanin zipllamamasi icin en yuksek kart yuksekligi onceden rezerve edilir.

---

## Dosya yapisi

```
index.html              Sayfa iskeleti
assets/css/styles.css   Tum stiller
assets/js/app.js        Kart olusturma, sekmeler, karusel, link yonlendirme
assets/img/             Yer tutucu avatarlar (kendi gorsellerinizle degistirin)
data/agents.js          AVATARLAR VE LINKLER
data/site.js            Sayfa metinleri, kisayollar, footer
```

## Yayina alma

Statik dosyalardan olustugu icin herhangi bir statik barindirmaya (GitHub Pages, Netlify,
Vercel, S3, kendi web sunucunuz) oldugu gibi yuklenebilir.
