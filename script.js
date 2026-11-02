const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const heroVideo = document.querySelector('.hero-video');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideoBreakpoint = window.matchMedia('(max-width: 900px)');
const experienceLogos = document.querySelector('.experience-logos');

if (experienceLogos) {
  const duplicateLogos = experienceLogos.cloneNode(true);
  duplicateLogos.setAttribute('aria-hidden', 'true');
  duplicateLogos.querySelectorAll('img').forEach((image) => {
    image.alt = '';
    image.loading = 'eager';
  });
  experienceLogos.after(duplicateLogos);
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Lazy media can change page height mid-scroll, so re-aim at the target until the position settles.
function settleOnTarget(target, isContact, attempt = 0) {
  const headerOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const wanted = isContact ? maxScroll : Math.min(maxScroll, target.getBoundingClientRect().top + window.scrollY - headerOffset);
  if (Math.abs(window.scrollY - wanted) <= 2 || attempt >= 8) return;
  window.scrollTo({ top: wanted, behavior: attempt === 0 ? (reducedMotionPreference.matches ? 'auto' : 'smooth') : 'auto' });
  window.setTimeout(() => settleOnTarget(target, isContact, attempt + 1), attempt === 0 ? 900 : 250);
}

function goToHash(hash, updateHistory) {
  const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!target) return false;
  if (updateHistory) history.pushState(null, '', hash);
  settleOnTarget(target, target.id === 'contact');
  return true;
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
  const url = new URL(link.href, window.location.href);
  if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#top') return;
  if (goToHash(url.hash, true)) event.preventDefault();
});

if (window.location.hash && window.location.hash !== '#top') {
  window.addEventListener('load', () => goToHash(window.location.hash, false));
}

if (heroVideo) {
  let heroVideoTimeout;

  heroVideo.addEventListener('error', () => {
    console.error('The background video could not be loaded.', heroVideo.error);
  });

  const startHeroVideo = () => {
    window.clearTimeout(heroVideoTimeout);
    heroVideoTimeout = window.setTimeout(() => {
      const source = heroVideoBreakpoint.matches ? heroVideo.dataset.mobileSrc : heroVideo.dataset.desktopSrc;
      if (!source) {
        console.error('A background video source was not configured for this viewport.');
        return;
      }

      if (heroVideo.getAttribute('src') !== source) {
        heroVideo.src = source;
        heroVideo.load();
      }

      heroVideo.play().then(() => {
        if (!reducedMotionPreference.matches) heroVideo.classList.add('is-visible');
      }).catch((error) => {
        console.warn('The background video could not autoplay.', error);
      });
    }, 2000);
  };

  heroVideoBreakpoint.addEventListener('change', () => {
    if (reducedMotionPreference.matches) return;
    heroVideo.pause();
    heroVideo.classList.remove('is-visible');
    startHeroVideo();
  });

  if (!reducedMotionPreference.matches) startHeroVideo();

  reducedMotionPreference.addEventListener('change', (event) => {
    if (event.matches) {
      window.clearTimeout(heroVideoTimeout);
      heroVideo.pause();
      heroVideo.classList.remove('is-visible');
      return;
    }

    startHeroVideo();
  });
}
