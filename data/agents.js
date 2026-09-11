/* =============================================================================
   AVATAR / AJAN TANIMLARI
   -----------------------------------------------------------------------------
   Ana sayfadaki 3 avatar buradan yönetilir. Kod değiştirmeden sadece bu dosyayı
   düzenlemek yeterlidir. Docker ile çalıştırırken bu klasör konteynere bağlandığı
   için dosyayı kaydedip sayfayı yenilemek yeterlidir; imajı yeniden kurmanız
   gerekmez.

   name    : Kart üzerindeki isim
   role    : İsim altındaki italik unvan. Boş bırakılırsa satır hiç görünmez.
   ground  : Kartın koyu gövde zemini (marka rampasından koyu bir ton)
   accent  : Karta ait vurgu rengi — hale, kenarlık ve fotoğraf zemini
   photo   : Avatar görseli. Yerel dosya ("assets/img/spy.jpg") ya da dış bağlantı
             ("https://.../spy.jpg") olabilir. Yüklenemezse yedek avatar çizilir.
   link    : Avatara ERİŞİM bağlantısı. Kart butonu ve sekmeler bu adrese gider.
             Boşken buton pasif görünür ve hangi alanın doldurulacağı söylenir.
   query   : Yazı kutusuna girilen metnin bağlantıya ekleneceği parametre adı
             (varsayılan "q"). Örnek: link + "?q=rakip analizi"
   summary : Kart açıklaması. Boş bırakılırsa satır görünmez.
   tabs    : Avatarın üzerine gelindiğinde açılan ALT BAŞLIKLAR (sekmeler).
             Sekmede "link" yoksa avatarın ana bağlantısı kullanılır.

   NOT: Alt başlıklar henüz belirlenmediği için aşağıdakiler yer tutucudur.
   ========================================================================== */

window.AGENTS = [
  {
    id: 'spkpy',
    name: 'SPKPY',
    role: '',
    ground: '#0f7a5f',
    accent: '#c2ecdf',
    photo: 'assets/img/spkpy.svg',
    link: '',
    query: 'q',
    summary: 'Kısa tanıtım metni — data/agents.js içinden düzenlenir.',
    cta: 'Aç',
    tabs: [
      { label: 'Alt başlık 1', title: 'Alt başlık 1', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' },
      { label: 'Alt başlık 2', title: 'Alt başlık 2', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' }
    ]
  },
  {
    id: 'spmo',
    name: 'SPMO',
    role: '',
    ground: '#063d2f',
    accent: '#7dd0b6',
    photo: 'assets/img/spmo.svg',
    link: '',
    query: 'q',
    summary: 'Kısa tanıtım metni — data/agents.js içinden düzenlenir.',
    cta: 'Aç',
    tabs: [
      { label: 'Alt başlık 1', title: 'Alt başlık 1', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' },
      { label: 'Alt başlık 2', title: 'Alt başlık 2', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' }
    ]
  },
  {
    id: 'spy',
    name: 'SPY',
    role: '',
    ground: '#2C3340',
    accent: '#2aa78e',
    photo: 'assets/img/spy.svg',
    link: '',
    query: 'q',
    summary: 'Kısa tanıtım metni — data/agents.js içinden düzenlenir.',
    cta: 'Aç',
    tabs: [
      { label: 'Alt başlık 1', title: 'Alt başlık 1', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' },
      { label: 'Alt başlık 2', title: 'Alt başlık 2', text: 'Bu sekmenin metnini data/agents.js içinden yazın.', link: '' }
    ]
  }
];
