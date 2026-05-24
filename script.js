/* =========================================================
   Portfolio — interactions
   Theme toggle, scroll reveal, active nav, mobile menu,
   card hover halo. Vanilla, no deps.
   ========================================================= */

(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* =========================================================
     Content hydration — render variable parts from SITE_DATA
     ========================================================= */
  const DATA = window.SITE_DATA;

  // Escape any string before inserting into innerHTML
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Allow a tiny inline markup: {em}...{/em} -> <em>...</em>.
  // Input must already be escaped via esc().
  function inlineEm(escaped) {
    return escaped.replace(/\{em\}/g, '<em>').replace(/\{\/em\}/g, '</em>');
  }

  function rich(s) {
    return inlineEm(esc(s));
  }

  function setAttrIfEl(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function setMeta(name, value) {
    const el = document.querySelector('[data-meta="' + name + '"]');
    if (el) el.setAttribute('content', value);
  }

  function renderMeta(d) {
    if (!d || !d.meta) return;
    const m = d.meta;
    if (m.title) document.title = m.title;
    setMeta('description', m.description || '');
    setMeta('og:title', m.title || '');
    setMeta('og:description', m.ogDescription || m.description || '');
    setMeta('og:url', m.url || '');
    setMeta('og:image', m.ogImage || '');

    const ld = document.querySelector('[data-ldjson]');
    if (ld && m.person) {
      ld.textContent = JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: m.person.name,
          jobTitle: m.person.jobTitle,
          worksFor: { '@type': 'Organization', name: m.person.worksFor },
          url: m.url,
          sameAs: m.person.sameAs || [],
        },
        null,
        2
      );
    }
  }

  function renderBrandAndNav(d) {
    const mark = document.querySelector('[data-brand-mark]');
    if (mark && d.brand) mark.textContent = d.brand.mark || '';
    const brandLink = document.querySelector('[data-brand-link]');
    if (brandLink && d.brand && d.brand.ariaLabel) {
      brandLink.setAttribute('aria-label', d.brand.ariaLabel);
    }

    const navEl = document.querySelector('[data-nav-links]');
    const mobileNavEl = document.querySelector('[data-mobile-nav-links]');
    const items = (d.nav || [])
      .map(
        (n) =>
          '<a href="' +
          esc(n.href) +
          '" data-nav-link>' +
          esc(n.label) +
          '</a>'
      )
      .join('');
    if (navEl) navEl.innerHTML = items;

    const mobileItems = (d.nav || [])
      .map(
        (n) =>
          '<a href="' +
          esc(n.href) +
          '" data-menu-link>' +
          esc(n.label) +
          '</a>'
      )
      .join('');
    if (mobileNavEl) mobileNavEl.innerHTML = mobileItems;
  }

  function renderHero(d) {
    const sec = document.querySelector('[data-section="hero"]');
    if (!sec || !d.hero) return;
    const h = d.hero;
    const ctas = (h.ctas || [])
      .map((c) => {
        const cls = 'btn btn--' + (c.variant || 'ghost');
        const target = c.external ? ' target="_blank" rel="noopener"' : '';
        const arrow = c.arrow
          ? ' <span aria-hidden="true" class="btn__arrow">&rarr;</span>'
          : '';
        return (
          '<a href="' +
          esc(c.href) +
          '" class="' +
          cls +
          '"' +
          target +
          '>' +
          esc(c.label) +
          arrow +
          '</a>'
        );
      })
      .join('');

    sec.innerHTML =
      '<div class="container hero__inner">' +
      '<h1 class="hero__title reveal">' +
      esc(h.firstName) +
      '<br /><em>' +
      esc(h.lastName) +
      '</em></h1>' +
      '<p class="hero__lede reveal">' + esc(h.lede) + '</p>' +
      '<div class="hero__cta reveal">' + ctas + '</div>' +
      '</div>';
  }

  function renderNow(d) {
    const sec = document.querySelector('[data-section="now"]');
    if (!sec || !d.now) return;
    sec.innerHTML =
      '<div class="container now__inner reveal">' +
      '<span class="now__dot" aria-hidden="true"></span>' +
      '<span class="now__label">' + esc(d.now.label) + '</span>' +
      '<span class="now__text">' + rich(d.now.text) + '</span>' +
      '</div>';
  }

  function renderSectionHead(eyebrow, title) {
    return (
      '<header class="section__head">' +
      '<p class="eyebrow reveal">' + esc(eyebrow) + '</p>' +
      '<h2 class="section__title reveal">' + rich(title) + '</h2>' +
      '</header>'
    );
  }

  function renderProjects(d) {
    const sec = document.querySelector('[data-section="projects"]');
    if (!sec || !d.projects) return;
    const p = d.projects;
    const cards = (p.items || [])
      .map((it) => {
        const tags = (it.tags || [])
          .map((t) => '<li>' + esc(t) + '</li>')
          .join('');
        return (
          '<li class="card reveal" data-hover-halo>' +
          '<p class="card__meta"><span>' + esc(it.period) + '</span><span>' + esc(it.org) + '</span></p>' +
          '<h3 class="card__title">' + esc(it.title) + '</h3>' +
          '<p class="card__lede">' + esc(it.lede) + '</p>' +
          '<ul class="tags" role="list">' + tags + '</ul>' +
          '</li>'
        );
      })
      .join('');

    sec.innerHTML =
      '<div class="container section__grid">' +
      renderSectionHead(p.eyebrow, p.title) +
      '<div class="section__body"><ul class="cards" role="list">' + cards + '</ul></div>' +
      '</div>';
  }

  function renderTimelineSection(sec, data, opts) {
    if (!sec || !data) return;
    const rows = (data.items || [])
      .map((it) => {
        const bullets = (it.bullets || [])
          .map((b) => '<li>' + esc(b) + '</li>')
          .join('');
        const bulletsBlock = bullets
          ? '<ul class="timeline__bullets">' + bullets + '</ul>'
          : '';
        return (
          '<li class="timeline__row reveal">' +
          '<p class="timeline__year">' + esc(it.year) + '</p>' +
          '<div class="timeline__body">' +
          '<h3 class="timeline__role">' + esc(it.role) +
          '<span class="timeline__company">' + esc(it.company) + '</span>' +
          '</h3>' +
          bulletsBlock +
          '</div>' +
          '</li>'
        );
      })
      .join('');

    sec.innerHTML =
      '<div class="container section__grid">' +
      renderSectionHead(data.eyebrow, data.title) +
      '<div class="section__body"><ol class="timeline" role="list">' + rows + '</ol></div>' +
      '</div>';
  }

  function renderAbout(d) {
    const sec = document.querySelector('[data-section="about"]');
    if (!sec || !d.about) return;
    const a = d.about;
    const paras = (a.paragraphs || [])
      .map((p) => '<p class="prose reveal">' + esc(p) + '</p>')
      .join('');
    sec.innerHTML =
      '<div class="container section__grid">' +
      renderSectionHead(a.eyebrow, a.title) +
      '<div class="section__body">' + paras + '</div>' +
      '</div>';
  }

  function renderSkills(d) {
    const sec = document.querySelector('[data-section="skills"]');
    if (!sec || !d.skills) return;
    const s = d.skills;
    const rows = (s.rows || [])
      .map(
        (r) =>
          '<div class="stack__row reveal"><dt>' +
          esc(r.label) +
          '</dt><dd>' +
          esc(r.value) +
          '</dd></div>'
      )
      .join('');
    sec.innerHTML =
      '<div class="container section__grid">' +
      renderSectionHead(s.eyebrow, s.title) +
      '<div class="section__body"><dl class="stack">' + rows + '</dl></div>' +
      '</div>';
  }

  function renderWriting(d) {
    const sec = document.querySelector('[data-section="writing"]');
    if (!sec || !d.writing) return;
    const w = d.writing;
    const items = (w.items || [])
      .map((it) => {
        const disabled = it.disabled ? ' aria-disabled="true"' : '';
        const target = it.disabled ? '' : ' target="_blank" rel="noopener"';
        return (
          '<li class="writing-list__item reveal">' +
          '<a href="' + esc(it.href) + '" class="writing-list__link"' + target + disabled + '>' +
          '<span class="writing-list__date">' + esc(it.date) + '</span>' +
          '<span class="writing-list__title">' + esc(it.title) + '</span>' +
          '<span class="writing-list__arrow" aria-hidden="true">&rarr;</span>' +
          '</a></li>'
        );
      })
      .join('');

    const more = w.more
      ? '<a class="writing-more reveal" href="' +
      esc(w.more.href) +
      '" target="_blank" rel="noopener">' +
      esc(w.more.label) +
      ' <span aria-hidden="true">&rarr;</span></a>'
      : '';

    sec.innerHTML =
      '<div class="container section__grid">' +
      renderSectionHead(w.eyebrow, w.title) +
      '<div class="section__body"><ul class="writing-list" role="list">' + items + '</ul>' + more + '</div>' +
      '</div>';
  }

  function renderContact(d) {
    const sec = document.querySelector('[data-section="contact"]');
    if (!sec || !d.contact) return;
    const c = d.contact;
    const socials = (c.socials || [])
      .map((s) => {
        const target = s.external ? ' target="_blank" rel="noopener"' : '';
        return '<li><a href="' + esc(s.href) + '"' + target + '>' + esc(s.label) + '</a></li>';
      })
      .join('');
    const t = c.title;
    const titleHtml = t && typeof t === 'object'
      ? '<h2 class="contact__title reveal">' +
        esc(t.prefix || '') +
        '<a href="' + esc(t.linkHref) + '" target="_blank" rel="noopener">' +
        esc(t.linkLabel) +
        '</a>' +
        esc(t.suffix || '') +
        '</h2>'
      : '<h2 class="contact__title reveal">' + rich(t || '') + '</h2>';
    const noteHtml = c.note
      ? '<p class="contact__note reveal">' + esc(c.note) + '</p>'
      : '';
    sec.innerHTML =
      '<div class="container contact__inner">' +
      '<p class="eyebrow reveal">' + esc(c.eyebrow) + '</p>' +
      titleHtml +
      noteHtml +
      '<ul class="socials reveal" role="list">' + socials + '</ul>' +
      '</div>';
  }

  function renderFooter(d) {
    const sec = document.querySelector('[data-section="footer"]');
    if (!sec || !d.footer) return;
    const f = d.footer;
    sec.innerHTML =
      '<div class="container footer__inner">' +
      '<span>&copy; <span data-year></span> ' + esc(f.copyrightName) + '</span>' +
      '<span class="footer__build">' + esc(f.build) + '</span>' +
      '</div>';
  }

  if (DATA) {
    renderMeta(DATA);
    renderBrandAndNav(DATA);
    renderHero(DATA);
    renderNow(DATA);
    renderProjects(DATA);
    renderTimelineSection(
      document.querySelector('[data-section="experience"]'),
      DATA.experience
    );
    renderTimelineSection(
      document.querySelector('[data-section="education"]'),
      DATA.education
    );
    renderAbout(DATA);
    renderSkills(DATA);
    renderWriting(DATA);
    renderContact(DATA);
    renderFooter(DATA);
  }

  /* ---------- Year stamp ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.querySelector('[data-theme-toggle]');

  function getEffectiveTheme() {
    const stored = root.getAttribute('data-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) { }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  /* ---------- Sticky nav scrolled state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealEls.forEach((el, i) => {
      // small stagger within a group of siblings
      const delay = Math.min(i % 6, 5) * 60;
      el.style.setProperty('--reveal-delay', delay + 'ms');
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Active nav link via section observer ---------- */
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sectionIds = Array.from(navLinks)
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && h.startsWith('#') && h.length > 1);

  if ('IntersectionObserver' in window && sectionIds.length) {
    const sections = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean);

    const setActive = (id) => {
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === '#' + id) {
          a.setAttribute('aria-current', 'true');
        } else {
          a.removeAttribute('aria-current');
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuLinks = document.querySelectorAll('[data-menu-link]');
  const menuCloseEls = document.querySelectorAll('[data-menu-close]');

  let lastFocused = null;

  function openMenu() {
    if (!mobileMenu) return;
    lastFocused = document.activeElement;
    mobileMenu.hidden = false;
    // force reflow so transition runs
    void mobileMenu.offsetWidth;
    mobileMenu.setAttribute('data-open', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    body.classList.add('menu-open');
    document.addEventListener('keydown', onKeydown);
    // focus first link
    const first = mobileMenu.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.setAttribute('data-open', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    body.classList.remove('menu-open');
    document.removeEventListener('keydown', onKeydown);

    const finish = () => {
      mobileMenu.hidden = true;
      mobileMenu.removeEventListener('transitionend', finish);
    };
    if (prefersReducedMotion) {
      finish();
    } else {
      mobileMenu.addEventListener('transitionend', finish);
    }

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === 'Tab' && mobileMenu) {
      // simple focus trap
      const focusables = mobileMenu.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('data-open') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });
    menuLinks.forEach((a) => a.addEventListener('click', closeMenu));
    menuCloseEls.forEach((el) => el.addEventListener('click', closeMenu));
  }

  // Close menu if viewport grows past mobile breakpoint
  const mqDesktop = window.matchMedia('(min-width: 768px)');
  const onMqChange = () => {
    if (mqDesktop.matches && mobileMenu && mobileMenu.getAttribute('data-open') === 'true') {
      closeMenu();
    }
  };
  if (mqDesktop.addEventListener) {
    mqDesktop.addEventListener('change', onMqChange);
  } else if (mqDesktop.addListener) {
    mqDesktop.addListener(onMqChange);
  }

  /* ---------- Card hover halo (pointer position) ---------- */
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (supportsHover) {
    const halos = document.querySelectorAll('[data-hover-halo]');
    halos.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }
})();
