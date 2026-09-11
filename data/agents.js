/* =============================================================================
   AVATAR / AJAN TANIMLARI
   -----------------------------------------------------------------------------
   Ana sayfadaki 3 avatar buradan yonetilir. Kod degistirmeden sadece bu dosyayi
   duzenlemek yeterlidir.

   photo : Avatar gorseli. Hem yerel dosya ("assets/img/nash.svg") hem de
           disaridan verilen bir link ("https://.../nash.jpg") kabul eder.
           Gorsel yuklenemezse otomatik olarak yedek gorsele duser.
   link  : Avatara ERISIM linki. "Inspire me" butonu ve sekme baglantilari
           bu adrese gider. Link verilmediginde buton "yakinda" durumunda
           gorunur ve kullaniciya bilgi mesaji gosterilir.
   query : (opsiyonel) Alt taraftaki yazi kutusuna girilen metnin linke hangi
           parametre ile eklenecegi. Varsayilan "q".
           Ornek: link + "?q=rakip analizi"
   tabs  : Avatarin uzerine gelindiginde acilan ALT BASLIKLAR (sekmeler).
           Her sekmenin kendi basligi, aciklamasi ve opsiyonel kendi linki olur.
           Sekmede "link" yoksa avatarin ana linki kullanilir.
   ========================================================================== */

window.AGENTS = [
  {
    id: 'tracy',
    name: 'Tracy',
    role: 'Tracker Manager',
    accent: '#6d4aff',
    photo: 'assets/img/tracy.svg',
    link: '',
    query: 'q',
    summary:
      "Sectiginiz sirketleri gercek zamanli izler, onemli gelismeleri one cikarir.",
    cta: 'Inspire me',
    tabs: [
      {
        label: 'Takip Listesi',
        title: 'Izlediginiz sirketler',
        text: 'Yatirim, urun ve yonetim hareketlerini tek akista toplar.',
        link: ''
      },
      {
        label: 'Uyarilar',
        title: 'Anlik uyarilar',
        text: 'Esikler asildiginda bildirir, gunluk ozet raporu olusturur.',
        link: ''
      }
    ]
  },
  {
    id: 'nash',
    name: 'Nash',
    role: 'Competitor Analysis Manager',
    accent: '#2563ff',
    photo: 'assets/img/nash.svg',
    link: '',
    query: 'q',
    summary:
      'Rekabet ortamina dair kapsamli icgoruler sunar, kararlarinizi veriyle destekler.',
    cta: 'Inspire me',
    tabs: [
      {
        label: 'Rakip Karnesi',
        title: 'Rakip karnesi',
        text: 'Buyume, pazar payi ve karlilik gostergelerini yan yana karsilastirir.',
        link: ''
      },
      {
        label: 'Konumlandirma',
        title: 'Konumlandirma haritasi',
        text: 'Urun ve fiyat ekseninde rekabetteki bosluklari gorsellestirir.',
        link: ''
      }
    ]
  },
  {
    id: 'nova',
    name: 'Nova',
    role: 'Market Intelligence Manager',
    accent: '#e0489b',
    photo: 'assets/img/nova.svg',
    link: '',
    query: 'q',
    summary:
      'Sektor gelismeleri ve pazar trendleri konusunda sizi guncel tutar.',
    cta: 'Inspire me',
    tabs: [
      {
        label: 'Trendler',
        title: 'Yukselen trendler',
        text: 'Hizla buyuyen temalari ve yeni oyunculari listeler.',
        link: ''
      },
      {
        label: 'Duzenlemeler',
        title: 'Mevzuat radari',
        text: 'Isinizi etkileyecek mevzuat degisikliklerini sade dille ozetler.',
        link: ''
      }
    ]
  }
];
