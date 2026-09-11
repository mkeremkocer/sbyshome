/* =============================================================================
   SAYFA AYARLARI
   Marka adı, karşılama metni, footer bağlantıları ve sağdaki kısayollar.
   ========================================================================== */

window.SITE = {
  brand: 'Platform',
  userName: 'Ahmet',
  userInitials: 'MK',
  greeting: 'Merhaba',
  subtitle: 'Başlamak için bir ajan seçin ya da aşağıya ne yapmak istediğinizi yazın.',
  placeholder: 'Bugün neyi araştıralım?',

  /* İlk girişe özel tanıtım karuseli. false yaparsanız hiç açılmaz. */
  onboarding: true,

  /* Sol raydaki butonların bağlantıları. Boş bırakılırsa bilgi mesajı gösterilir.
     newChat boşsa tanıtım karuseli yeniden açılır. */
  nav: {
    newChat: '',
    activities: '',
    notifications: '',
    profile: ''
  },

  /* Sağdaki dairesel kısayollar. Bağlantı boşsa buton pasif görünür. */
  shortcuts: [
    { id: 'discover', label: 'Keşfet', glyph: 'sparkle', link: '' },
    { id: 'compare', label: 'Karşılaştır', glyph: 'compare', link: '' },
    { id: 'radar', label: 'Radar', glyph: 'radar', link: '' },
    { id: 'network', label: 'Ağ', glyph: 'network', link: '' },
    { id: 'insight', label: 'İçgörü', glyph: 'insight', link: '' },
    { id: 'reports', label: 'Raporlar', glyph: 'burst', link: '' }
  ],

  footerLinks: [
    { label: 'LinkedIn / X', link: '' },
    { label: 'İletişim', link: '' },
    { label: 'Ticari Şartlar', link: '' },
    { label: 'Gizlilik Politikası', link: '' },
    { label: 'Çerez Ayarları', link: '' }
  ],

  copyright: 'Copyright © 2026 Şirketiniz. Tüm hakları saklıdır.'
};
