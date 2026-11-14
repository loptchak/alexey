// The slider owns scrolling and drag state; it does not render review content.
export function initReviewsSlider(itemCount) {
  const revTrack = document.getElementById('revTrack');
  const revDots = document.getElementById('revDots');
  const revPrev = document.getElementById('revPrev');
  const revNext = document.getElementById('revNext');
  // one slide = one card width + gap; the CSS decides how many cards fit (3 / 2 / 1 + peek)

  function revStep() {
    const card = revTrack.firstElementChild;
    return card ? card.offsetWidth + parseFloat(getComputedStyle(revTrack).columnGap) : 1;
  }
  function revMaxScroll() {
    return revTrack.scrollWidth - revTrack.clientWidth;
  }
  // number of distinct snap positions: the last cards can't each start a slide
  function revPositions() {
    return itemCount ? Math.max(1, Math.ceil(revMaxScroll() / revStep() - 0.05) + 1) : 1;
  }
  function revIndex() {
    if (revTrack.scrollLeft >= revMaxScroll() - 2) return revPositions() - 1;
    return Math.round(revTrack.scrollLeft / revStep());
  }
  function revGo(i) {
    revTrack.scrollTo({ left: i * revStep(), behavior: 'smooth' });
  }

  function buildRevDots() {
    const n = revPositions();
    revDots.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `${i + 1} / ${n}`);
      b.onclick = () => revGo(i);
      revDots.appendChild(b);
    }
    // nothing to slide (everything fits) -> hide the controls
    revDots.parentElement.style.display = n > 1 ? '' : 'none';
    updateRevNav();
  }
  function updateRevNav() {
    const i = revIndex();
    [...revDots.children].forEach((d, k) => d.classList.toggle('active', k === i));
    revPrev.disabled = revTrack.scrollLeft <= 2;
    revNext.disabled = revTrack.scrollLeft >= revMaxScroll() - 2;
  }
  revPrev.addEventListener('click', () => revGo(revIndex() - 1));
  revNext.addEventListener('click', () => revGo(revIndex() + 1));
  revTrack.addEventListener('scroll', updateRevNav, { passive: true });

  // mouse drag-to-scroll on desktop (touch already swipes natively)
  let revDrag = null;
  let revDragged = false; // swallows the click that ends a drag, so it doesn't open the modal
  let revGlide = 0;
  // own glide instead of smooth scrollTo: snap must stay off until we arrive, otherwise
  // the browser re-snaps to the nearest card mid-way, and native smooth scroll gives no reliable "done"
  function revGlideTo(goal) {
    const from = revTrack.scrollLeft,
      t0 = performance.now(),
      dur = 320;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      revTrack.scrollLeft = from + (goal - from) * (1 - Math.pow(1 - k, 3)); // ease-out
      if (k < 1) revGlide = requestAnimationFrame(tick);
      else revTrack.classList.remove('nosnap');
    };
    revGlide = requestAnimationFrame(tick);
  }
  revTrack.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    e.preventDefault(); // no text selection / native image drag
    cancelAnimationFrame(revGlide);
    revDrag = { x: e.clientX, left: revTrack.scrollLeft, moved: false };
  });
  window.addEventListener('pointermove', (e) => {
    if (!revDrag) return;
    const dx = e.clientX - revDrag.x;
    if (!revDrag.moved) {
      if (Math.abs(dx) < 5) return; // tiny jitter is still a click
      revDrag.moved = true;
      revTrack.classList.add('dragging', 'nosnap');
    }
    revTrack.scrollLeft = revDrag.left - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!revDrag) return;
    if (revDrag.moved) {
      // settle on a slide, leaning in the drag direction so a short pull still turns the page
      const pos = revTrack.scrollLeft / revStep();
      const forward = revTrack.scrollLeft > revDrag.left;
      const target = forward ? Math.ceil(pos - 0.15) : Math.floor(pos + 0.15);
      revTrack.classList.remove('dragging');
      const i = Math.max(0, Math.min(target, revPositions() - 1));
      revGlideTo(Math.min(i * revStep(), revMaxScroll()));
      revDragged = true;
      setTimeout(() => {
        revDragged = false;
      });
    } else {
      revTrack.classList.remove('nosnap'); // a click that stopped a glide mid-way
    }
    revDrag = null;
  });
  window.addEventListener('resize', buildRevDots);

  return { refresh: buildRevDots, wasDragged: () => revDragged };
}
