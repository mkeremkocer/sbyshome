/* =============================================================================
   SAYFA AYARLARI
   Marka adi, karsilama metni, footer linkleri ve sag taraftaki kisayollar.
   ========================================================================== */

window.SITE = {
  brand: 'entrapeer',
  userName: 'Ahmed',
  userInitials: 'MK',
  greeting: 'Hello',
  subtitle: 'Baslamak icin bir ajan secin ya da asagiya ne yapmak istediginizi yazin.',
  placeholder: 'Bugun neyi arastiralim?',

  /* Ilk girise ozel tanitim karuseli. false yaparsan hic acilmaz. */
  onboarding: true,

  /* Sol raydaki butonlarin linkleri. Bos birakilirsa bilgi mesaji gosterilir.
     newChat bos ise tanitim karuseli yeniden acilir. */
  nav: {
    newChat: '',
    activities: '',
    notifications: '',
    profile: ''
  },

  /* Sag taraftaki dairesel kisayollar. link bos ise buton pasif gorunur. */
  shortcuts: [
    { id: 'discover', label: 'Kesfet', glyph: 'sparkle', link: '' },
    { id: 'compare', label: 'Karsilastir', glyph: 'compare', link: '' },
    { id: 'radar', label: 'Radar', glyph: 'radar', link: '' },
    { id: 'network', label: 'Ag', glyph: 'network', link: '' },
    { id: 'insight', label: 'Icgoru', glyph: 'insight', link: '' },
    { id: 'reports', label: 'Raporlar', glyph: 'burst', link: '' }
  ],

  footerLinks: [
    { label: 'Linkedin / X', link: '' },
    { label: 'Contact', link: '' },
    { label: 'Commercial Terms & Conditions', link: '' },
    { label: 'Privacy Policy', link: '' },
    { label: 'Cookie Settings', link: '' }
  ],

  copyright: 'Copyright © 2026 entrapeer, All rights reserved.'
};
