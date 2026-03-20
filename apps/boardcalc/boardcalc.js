(function () {
  const ROTATE_INTERVAL = 3500;

  const cards = document.querySelectorAll('.feature-card-selectable');
  const tracks = document.querySelectorAll('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!cards.length || !tracks.length) return;

  let activeCarousel = 'stair';
  let activeIndex = 0;
  let rotateTimer = null;

  function getActiveTrack() {
    return document.querySelector('.carousel-track[data-carousel="' + activeCarousel + '"]');
  }

  function getActiveImages() {
    const track = getActiveTrack();
    return track ? track.querySelectorAll('.phone-mockup') : [];
  }

  function showCarousel(name) {
    activeCarousel = name;
    activeIndex = 0;

    tracks.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-carousel') === name);
    });

    cards.forEach(function (c) {
      c.classList.toggle('is-active', c.getAttribute('data-carousel') === name);
    });

    updateVisibleImage();
    renderDots();
    resetRotateTimer();
  }

  function updateVisibleImage() {
    const slides = getActiveImages();
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-visible', i === activeIndex);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === activeIndex);
    });
  }

  function goToSlide(index) {
    const imgs = getActiveImages();
    if (imgs.length === 0) return;
    activeIndex = (index + imgs.length) % imgs.length;
    updateVisibleImage();
    resetRotateTimer();
  }

  function advanceSlide() {
    const imgs = getActiveImages();
    goToSlide(activeIndex + 1);
  }

  function renderDots() {
    const imgs = getActiveImages();
    dotsContainer.innerHTML = '';

    imgs.forEach(function (_, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'carousel-dot' + (i === activeIndex ? ' is-active' : '');
      btn.setAttribute('aria-label', 'View slide ' + (i + 1));
      btn.addEventListener('click', function () {
        goToSlide(i);
      });
      dotsContainer.appendChild(btn);
    });
  }

  function resetRotateTimer() {
    if (rotateTimer) clearInterval(rotateTimer);
    rotateTimer = setInterval(advanceSlide, ROTATE_INTERVAL);
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      showCarousel(card.getAttribute('data-carousel'));
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showCarousel(card.getAttribute('data-carousel'));
      }
    });
  });

  showCarousel('stair');
})();
