/* =============================================================================
   AVATAR / AJAN TANIMLARI
   -----------------------------------------------------------------------------
   Ana sayfadaki 3 avatar buradan yönetilir. Kod değiştirmeden sadece bu dosyayı
   düzenlemek yeterlidir.

   photo : Avatar görseli. Hem yerel dosya ("assets/img/nash.jpg") hem de
           dışarıdan verilen bir bağlantı ("https://.../nash.jpg") kabul eder.
           Görsel yüklenemezse otomatik olarak yedek avatar çizilir.
   link  : Avatara ERİŞİM bağlantısı. "İlham ver" butonu ve sekme bağlantıları
           bu adrese gider. Bağlantı verilmediğinde buton pasif görünür ve
           kullanıcıya hangi alanın doldurulacağını söyleyen bir mesaj çıkar.
   query : (opsiyonel) Alt taraftaki yazı kutusuna girilen metnin bağlantıya
           hangi parametre ile ekleneceği. Varsayılan "q".
           Örnek: link + "?q=rakip analizi"
   tabs  : Avatarın üzerine gelindiğinde açılan ALT BAŞLIKLAR (sekmeler).
           Her sekmenin kendi başlığı, açıklaması ve isteğe bağlı kendi
           bağlantısı olur. Sekmede "link" yoksa avatarın ana bağlantısı kullanılır.
   ========================================================================== */

window.AGENTS = [
  {
    id: 'tracy',
    name: 'Tracy',
    role: 'Takip Yöneticisi',
    accent: '#6d4aff',
    photo: 'assets/img/tracy.svg',
    link: '',
    query: 'q',
    summary: 'Seçtiğiniz şirketleri gerçek zamanlı izler, önemli gelişmeleri öne çıkarır.',
    cta: 'İlham ver',
    tabs: [
      {
        label: 'Takip Listesi',
        title: 'İzlediğiniz şirketler',
        text: 'Yatırım, ürün ve yönetim hareketlerini tek akışta toplar.',
        link: ''
      },
      {
        label: 'Uyarılar',
        title: 'Anlık uyarılar',
        text: 'Eşikler aşıldığında bildirir, günlük özet raporu oluşturur.',
        link: ''
      }
    ]
  },
  {
    id: 'nash',
    name: 'Nash',
    role: 'Rekabet Analizi Yöneticisi',
    accent: '#2563ff',
    photo: 'assets/img/nash.svg',
    link: '',
    query: 'q',
    summary: 'Rekabet ortamına dair kapsamlı içgörüler sunar, kararlarınızı veriyle destekler.',
    cta: 'İlham ver',
    tabs: [
      {
        label: 'Rakip Karnesi',
        title: 'Rakip karnesi',
        text: 'Büyüme, pazar payı ve kârlılık göstergelerini yan yana karşılaştırır.',
        link: ''
      },
      {
        label: 'Konumlandırma',
        title: 'Konumlandırma haritası',
        text: 'Ürün ve fiyat ekseninde rekabetteki boşlukları görselleştirir.',
        link: ''
      }
    ]
  },
  {
    id: 'nova',
    name: 'Nova',
    role: 'Pazar İstihbaratı Yöneticisi',
    accent: '#e0489b',
    photo: 'assets/img/nova.svg',
    link: '',
    query: 'q',
    summary: 'Sektör gelişmeleri ve pazar trendleri konusunda sizi güncel tutar.',
    cta: 'İlham ver',
    tabs: [
      {
        label: 'Trendler',
        title: 'Yükselen trendler',
        text: 'Hızla büyüyen temaları ve yeni oyuncuları listeler.',
        link: ''
      },
      {
        label: 'Düzenlemeler',
        title: 'Mevzuat radarı',
        text: 'İşinizi etkileyecek mevzuat değişikliklerini sade dille özetler.',
        link: ''
      }
    ]
  }
];
