// Review cards and the full-review dialog share the selected language.
export function initReviews(reviews, slider) {
  let curLang = 'ru';
  // flag of the language the student studied, shown on the avatar
  const flagSrc = { en: 'img/flags/uk.svg', fr: 'img/flags/fr.svg', fi: 'img/flags/fi.svg' };
  const starsHTML = '<svg class="ic"><use href="#i-star"/></svg>'.repeat(5);

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
    );
  }

  function avatarHTML(r) {
    const initial = Array.from(r.name[curLang])[0].toUpperCase();
    const flag = flagSrc[r.lang];
    return `${escapeHTML(initial)}${flag ? `<img class="rev-flag" src="${flag}" alt="">` : ''}`;
  }

  function renderReviews(lang, messages) {
    curLang = lang;
    const grid = document.getElementById('revTrack');
    const keepScroll = grid.scrollLeft; // language switch re-renders: stay on the same slide
    grid.innerHTML = '';
    reviews.forEach((r, i) => {
      const card = document.createElement('article');
      card.className = 'rev-card';
      card.onclick = () => {
        if (!slider.wasDragged()) openModal(i);
      };
      card.innerHTML = `
      <div class="rev-head">
        <div class="rev-meta">
          <div class="rev-avatar">${avatarHTML(r)}</div>
          <div class="rev-name">${escapeHTML(r.name[curLang])}<small>${escapeHTML(r.from[curLang])}</small></div>
        </div>
        <div class="rev-stars" aria-label="5/5">${starsHTML}</div>
      </div>
      <div class="rev-quote">«${escapeHTML(r.short[curLang])}»</div>
      <div class="rev-foot">
        <span class="more">${messages['rev.more']}</span>
      </div>
    `;
      grid.appendChild(card);
    });
    if (!reviews.length) {
      const message = document.createElement('p');
      message.textContent = messages['rev.empty'];
      grid.appendChild(message);
    }
    grid.scrollLeft = keepScroll;
    slider.refresh();
  }

  function openModal(i) {
    const r = reviews[i];
    document.getElementById('mAvatar').innerHTML = avatarHTML(r);
    document.getElementById('mStars').innerHTML = starsHTML;
    document.getElementById('mNm').textContent = r.name[curLang];
    document.getElementById('mFrom').textContent = r.from[curLang];
    document.getElementById('mBody').textContent = r.full[curLang];
    document.getElementById('reviewModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('reviewModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('reviewModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  return { render: renderReviews };
}
