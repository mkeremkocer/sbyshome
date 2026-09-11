/* =============================================================================
   Ajan ana sayfası
   Tüm içerik data/site.js ve data/agents.js dosyalarından okunur.
   ========================================================================== */

(function () {
  'use strict';

  var SITE = window.SITE || {};
  var AGENTS = Array.isArray(window.AGENTS) ? window.AGENTS.slice(0, 3) : [];

  var STORAGE_KEY = 'ajan-ana-sayfa:onboarding-dismissed';

  var els = {
    stage: document.getElementById('stage'),
    dock: document.getElementById('dock'),
    footerLinks: document.getElementById('footer-links'),
    composer: document.getElementById('composer'),
    input: document.getElementById('composer-input'),
    activeName: document.getElementById('active-agent-name'),
    overlay: document.getElementById('overlay'),
    overlayTrack: document.getElementById('overlay-track'),
    dontShow: document.getElementById('dont-show'),
    toast: document.getElementById('toast')
  };

  /* --------------------------------------------------------------------- */
  /* Yardımcılar                                                            */
  /* --------------------------------------------------------------------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function svg(paths, extraClass) {
    var ns = 'http://www.w3.org/2000/svg';
    var node = document.createElementNS(ns, 'svg');
    node.setAttribute('viewBox', '0 0 24 24');
    node.setAttribute('aria-hidden', 'true');
    if (extraClass) node.setAttribute('class', extraClass);
    paths.forEach(function (d) {
      var p = document.createElementNS(ns, 'path');
      p.setAttribute('d', d);
      node.appendChild(p);
    });
    return node;
  }

  function hasLink(value) {
    return typeof value === 'string' && value.trim() !== '';
  }

  var toastTimer;
  function toast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove('is-visible');
    }, 3200);
  }

  /* Bağlantısı henüz tanımlanmamış butonlar için ortak davranış */
  function openLink(url, fallbackMessage) {
    if (!hasLink(url)) {
      toast(fallbackMessage || 'Bu bağlantı henüz tanımlanmadı. data/agents.js içindeki "link" alanını doldurun.');
      return false;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  }

  /* Görsel yüklenemezse baş harfli yedek avatar üret */
  function fallbackAvatar(agent) {
    var code = (agent.name || '?').toUpperCase().slice(0, 6);
    var ground = agent.ground || '#0f7a5f';
    var accent = agent.accent || '#7dd0b6';
    var size = code.length > 4 ? 42 : 58;
    var markup =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + accent + '"/>' +
      '<stop offset="1" stop-color="' + ground + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="320" height="200" fill="url(#g)"/>' +
      '<circle cx="160" cy="100" r="62" fill="#ffffff" fill-opacity=".16"/>' +
      '<text x="160" y="' + (108 + size / 8) + '" font-family="Inter,Helvetica,Arial,sans-serif" ' +
      'font-size="' + size + '" font-weight="700" letter-spacing="1" ' +
      'fill="#ffffff" fill-opacity=".95" text-anchor="middle">' + code + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
  }

  /* --------------------------------------------------------------------- */
  /* Sayfa metinleri                                                        */
  /* --------------------------------------------------------------------- */

  function applySiteTexts() {
    document.querySelectorAll('[data-site]').forEach(function (node) {
      var key = node.getAttribute('data-site');
      if (SITE[key] != null && SITE[key] !== '') node.textContent = SITE[key];
    });

    if (SITE.placeholder && els.input) els.input.placeholder = SITE.placeholder;

    if (els.footerLinks) {
      (SITE.footerLinks || []).forEach(function (item) {
        var node;
        if (hasLink(item.link)) {
          node = el('a', null, item.label);
          node.href = item.link;
          node.target = '_blank';
          node.rel = 'noopener noreferrer';
        } else {
          node = el('a', null, item.label);
          node.href = '#';
          node.addEventListener('click', function (event) {
            event.preventDefault();
            toast('"' + item.label + '" bağlantısı data/site.js içinde tanımlanabilir.');
          });
        }
        els.footerLinks.appendChild(node);
      });
    }
  }

  /* --------------------------------------------------------------------- */
  /* Avatar kartı                                                           */
  /* --------------------------------------------------------------------- */

  function buildCard(agent, index, scope) {
    var card = el('article', 'card');
    card.style.setProperty('--ground', agent.ground || '#0f7a5f');
    card.style.setProperty('--accent', agent.accent || '#7dd0b6');
    card.dataset.index = String(index);
    card.dataset.scope = scope;
    card.setAttribute('role', 'listitem');
    card.tabIndex = 0;

    card.appendChild(el('span', 'card-glow'));
    card.appendChild(el('span', 'card__veil'));

    /* Fotoğraf */
    var photo = el('div', 'card__photo');
    var img = document.createElement('img');
    img.src = hasLink(agent.photo) ? agent.photo : fallbackAvatar(agent);
    img.alt = agent.name + ' — ' + (agent.role || '');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', function handleError() {
      img.removeEventListener('error', handleError);
      img.src = fallbackAvatar(agent);
    });
    photo.appendChild(img);
    card.appendChild(photo);

    /* Gövde */
    var body = el('div', 'card__body');
    body.appendChild(el('h3', 'card__name', agent.name));
    if (agent.role) body.appendChild(el('p', 'card__role', agent.role));
    body.appendChild(el('hr', 'card__rule'));
    if (agent.summary) body.appendChild(el('p', 'card__summary', agent.summary));

    /* Üzerine gelince açılan alt başlıklar */
    var tabs = Array.isArray(agent.tabs) ? agent.tabs : [];
    var tabButtons = [];
    var panels = [];

    if (tabs.length) {
      var extra = el('div', 'card__extra');
      var extraInner = el('div', 'card__extraInner');

      var tablist = el('div', 'tabs');
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-label', agent.name + ' alt başlıkları');

      var panelWrap = el('div', 'panels');

      tabs.forEach(function (tab, tabIndex) {
        var baseId = scope + '-' + (agent.id || index) + '-' + tabIndex;

        var button = el('button', 'tab', tab.label);
        button.type = 'button';
        button.id = 'tab-' + baseId;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', 'panel-' + baseId);
        button.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
        button.tabIndex = tabIndex === 0 ? 0 : -1;

        var panel = el('div', 'panel');
        panel.id = 'panel-' + baseId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', 'tab-' + baseId);
        panel.hidden = tabIndex !== 0;
        panel.appendChild(el('h4', 'panel__title', tab.title || tab.label));
        panel.appendChild(el('p', 'panel__text', tab.text || ''));

        var target = hasLink(tab.link) ? tab.link : agent.link;
        var open = el('a', 'panel__link');
        open.href = hasLink(target) ? target : '#';
        open.textContent = 'Bu bölüme git';
        open.appendChild(svg(['M7 17 17 7', 'M9 7h8v8']));
        if (hasLink(target)) {
          open.target = '_blank';
          open.rel = 'noopener noreferrer';
        } else {
          open.addEventListener('click', function (event) {
            event.preventDefault();
            toast(agent.name + ' / ' + tab.label + ' için bağlantı henüz tanımlanmadı.');
          });
        }
        panel.appendChild(open);

        button.addEventListener('click', function () { selectTab(tabIndex); });
        tablist.appendChild(button);
        panelWrap.appendChild(panel);
        tabButtons.push(button);
        panels.push(panel);
      });

      tablist.addEventListener('keydown', function (event) {
        var current = tabButtons.indexOf(document.activeElement);
        if (current < 0) return;
        var next = null;
        if (event.key === 'ArrowRight') next = (current + 1) % tabButtons.length;
        if (event.key === 'ArrowLeft') next = (current - 1 + tabButtons.length) % tabButtons.length;
        if (next === null) return;
        event.preventDefault();
        event.stopPropagation();
        selectTab(next);
        tabButtons[next].focus();
      });

      extraInner.appendChild(tablist);
      extraInner.appendChild(panelWrap);
      extra.appendChild(extraInner);
      body.appendChild(extra);
    }

    /* Erişim butonu */
    var cta = el('a', 'card__cta', agent.cta || 'Inspire me');
    cta.href = hasLink(agent.link) ? agent.link : '#';
    if (hasLink(agent.link)) {
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
    } else {
      cta.dataset.state = 'pending';
      cta.addEventListener('click', function (event) {
        event.preventDefault();
        toast(agent.name + ' için erişim bağlantısı henüz tanımlanmadı — data/agents.js > "' + (agent.id || agent.name) + '" > link');
      });
    }
    body.appendChild(cta);

    /* Sekme göstergesi (noktalar) */
    if (tabs.length > 1) {
      var dots = el('div', 'card__dots');
      tabs.forEach(function (tab, tabIndex) {
        var dot = el('button', 'dot');
        dot.type = 'button';
        dot.setAttribute('aria-label', tab.label);
        dot.setAttribute('aria-selected', tabIndex === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () { selectTab(tabIndex); });
        dots.appendChild(dot);
      });
      body.appendChild(dots);
      card.__dots = Array.prototype.slice.call(dots.children);
    }

    card.appendChild(body);

    function selectTab(tabIndex) {
      tabButtons.forEach(function (button, i) {
        var selected = i === tabIndex;
        button.setAttribute('aria-selected', selected ? 'true' : 'false');
        button.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
        if (card.__dots) card.__dots[i].setAttribute('aria-selected', selected ? 'true' : 'false');
      });
    }

    card.__selectTab = selectTab;
    return card;
  }

  /* --------------------------------------------------------------------- */
  /* Kart grupları (ana sayfa + tanıtım karuseli)                        */
  /* --------------------------------------------------------------------- */

  /* Sekmeler açılınca sayfanın zıplamaması için en yüksek kartın
     yüksekliğini önceden rezerve et. */
  function reserveHeight(container, cards) {
    container.style.minHeight = '';
    var tallest = 0;
    cards.forEach(function (card) {
      card.classList.add('is-measuring');
      tallest = Math.max(tallest, card.offsetHeight);
      card.classList.remove('is-measuring');
    });
    if (tallest) container.style.minHeight = tallest + 'px';
  }

  function createDeck(container, scope, options) {
    options = options || {};
    var cards = AGENTS.map(function (agent, index) {
      var card = buildCard(agent, index, scope);
      container.appendChild(card);
      return card;
    });

    var active = Math.min(options.initial != null ? options.initial : Math.floor(cards.length / 2), cards.length - 1);

    function setActive(index, notify) {
      if (index < 0 || index >= cards.length) return;
      active = index;
      cards.forEach(function (card, i) {
        card.classList.toggle('is-active', i === index);
        /* Karusel modunda aktif kart her zaman ortada durur */
        if (options.carousel) {
          card.style.order = String((i - index + cards.length + 1) % cards.length);
        }
      });
      if (notify !== false && typeof options.onChange === 'function') options.onChange(index, AGENTS[index]);
    }

    cards.forEach(function (card, index) {
      /* Üzerine gelince ilgili kart öne çıkar ve alt başlıkları açılır */
      card.addEventListener('mouseenter', function () { setActive(index); });
      card.addEventListener('focusin', function () { setActive(index); });
      /* Dokunmatik cihazlarda tıklama aynı işi görür */
      card.addEventListener('click', function () { setActive(index); });
    });

    container.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActive((active + 1) % cards.length);
        cards[active].focus();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActive((active - 1 + cards.length) % cards.length);
        cards[active].focus();
      }
    });

    setActive(active);

    var resizeTimer;
    function remeasure() { reserveHeight(container, cards); }
    remeasure();
    window.addEventListener('load', remeasure);
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(remeasure, 150);
    });

    return {
      cards: cards,
      setActive: setActive,
      /* Tanıtım karuseli açıkken ana sayfadaki kart vurgusunu geçici olarak kaldır */
      suspend: function () { cards.forEach(function (card) { card.classList.remove('is-active'); }); },
      resume: function () { setActive(active, false); },
      next: function () { setActive((active + 1) % cards.length); },
      prev: function () { setActive((active - 1 + cards.length) % cards.length); },
      current: function () { return active; }
    };
  }

  /* --------------------------------------------------------------------- */
  /* Sağdaki kısayollar                                               */
  /* --------------------------------------------------------------------- */

  var GLYPHS = {
    sparkle: ['M12 3v18M3 12h18', 'm6 6 12 12M18 6 6 18'],
    compare: ['M12 4v16', 'M7 8 4 13h6L7 8Z', 'M17 8l-3 5h6l-3-5Z'],
    radar: ['M12 12 19 6', 'M12 21a9 9 0 1 1 9-9', 'M12 17a5 5 0 1 1 5-5'],
    network: ['M12 6v4M12 14v4M8.5 9.5 6 8M15.5 9.5 18 8M8.5 14.5 6 16M15.5 14.5 18 16', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
    insight: ['M12 3a6 6 0 0 0-3 11v3h6v-3a6 6 0 0 0-3-11Z', 'M10 20h4'],
    burst: ['M12 2v20M2 12h20', 'M5 5l14 14M19 5 5 19']
  };

  function renderDock() {
    if (!els.dock) return;
    (SITE.shortcuts || []).forEach(function (item) {
      var button = el('button', 'shortcut');
      button.type = 'button';
      button.setAttribute('aria-label', item.label);
      button.appendChild(svg(GLYPHS[item.glyph] || GLYPHS.sparkle));
      button.appendChild(el('span', 'shortcut__tip', item.label));
      if (!hasLink(item.link)) button.dataset.state = 'pending';
      button.addEventListener('click', function () {
        openLink(item.link, '"' + item.label + '" bağlantısı data/site.js > shortcuts içinde tanımlanabilir.');
      });
      els.dock.appendChild(button);
    });
  }

  /* --------------------------------------------------------------------- */
  /* Yazı kutusu                                                            */
  /* --------------------------------------------------------------------- */

  function setupComposer(deck) {
    if (!els.composer || !els.input) return;

    els.input.addEventListener('input', function () {
      els.input.style.height = 'auto';
      els.input.style.height = Math.min(els.input.scrollHeight, 160) + 'px';
    });

    els.input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        els.composer.requestSubmit();
      }
    });

    els.composer.addEventListener('submit', function (event) {
      event.preventDefault();
      var agent = AGENTS[deck.current()];
      if (!agent) return;

      var text = els.input.value.trim();
      if (!hasLink(agent.link)) {
        toast(agent.name + ' için erişim bağlantısı henüz tanımlanmadı.');
        return;
      }

      var url;
      try {
        url = new URL(agent.link, window.location.href);
      } catch (error) {
        toast('Bağlantı biçimi hatalı: ' + agent.link);
        return;
      }
      if (text) url.searchParams.set(agent.query || 'q', text);

      window.open(url.toString(), '_blank', 'noopener,noreferrer');
      els.input.value = '';
      els.input.style.height = 'auto';
    });
  }

  /* --------------------------------------------------------------------- */
  /* Tanıtım karuseli                                                    */
  /* --------------------------------------------------------------------- */

  function readDismissed() {
    try { return window.localStorage.getItem(STORAGE_KEY) === '1'; }
    catch (error) { return false; }
  }

  function writeDismissed(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0'); }
    catch (error) { /* gizli sekme / depolama kapalı */ }
  }

  function setupOverlay(mainDeck) {
    if (!els.overlay || !els.overlayTrack || !AGENTS.length) return;

    var deck = createDeck(els.overlayTrack, 'ob', { initial: 1, carousel: true });
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      els.overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      if (mainDeck) mainDeck.suspend();
      var activeCard = deck.cards[deck.current()];
      if (activeCard) activeCard.focus();
    }

    function close() {
      els.overlay.hidden = true;
      document.body.style.overflow = '';
      if (mainDeck) mainDeck.resume();
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    els.overlay.querySelectorAll('[data-action="close-overlay"]').forEach(function (node) {
      node.addEventListener('click', close);
    });
    els.overlay.querySelector('[data-action="prev"]').addEventListener('click', function () { deck.prev(); });
    els.overlay.querySelector('[data-action="next"]').addEventListener('click', function () { deck.next(); });

    if (els.dontShow) {
      els.dontShow.checked = readDismissed();
      els.dontShow.addEventListener('change', function () { writeDismissed(els.dontShow.checked); });
    }

    document.addEventListener('keydown', function (event) {
      if (els.overlay.hidden) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') deck.next();
      if (event.key === 'ArrowLeft') deck.prev();
    });

    if (SITE.onboarding !== false && !readDismissed()) open();

    return { open: open, close: close };
  }

  /* --------------------------------------------------------------------- */
  /* Sol ray                                                                */
  /* --------------------------------------------------------------------- */

  function setupRail(overlay) {
    var app = document.querySelector('.app');
    var nav = SITE.nav || {};

    document.querySelectorAll('[data-action]').forEach(function (node) {
      var action = node.getAttribute('data-action');

      if (action === 'toggle-rail') {
        node.addEventListener('click', function () {
          var open = app.classList.toggle('is-rail-open');
          node.setAttribute('aria-label', open ? 'Menüyü daralt' : 'Menüyü genişlet');
        });
      }

      if (action === 'new-chat') {
        node.addEventListener('click', function () {
          if (hasLink(nav.newChat)) { openLink(nav.newChat); return; }
          if (overlay) overlay.open();
          else if (els.input) els.input.focus();
        });
      }

      if (action === 'activities' || action === 'notifications' || action === 'profile') {
        node.addEventListener('click', function () {
          openLink(nav[action], 'Bu bölümün bağlantısı data/site.js > nav içinde tanımlanabilir.');
        });
      }
    });
  }

  /* --------------------------------------------------------------------- */
  /* Başlat                                                                 */
  /* --------------------------------------------------------------------- */

  function init() {
    applySiteTexts();
    renderDock();

    if (!AGENTS.length) {
      els.stage.appendChild(el('p', 'composer__hint', 'data/agents.js içinde tanımlı ajan bulunamadı.'));
      return;
    }

    var deck = createDeck(els.stage, 'main', {
      initial: 1,
      onChange: function (index, agent) {
        if (els.activeName) els.activeName.textContent = agent.name;
      }
    });

    setupComposer(deck);
    var overlay = setupOverlay(deck);
    setupRail(overlay);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
