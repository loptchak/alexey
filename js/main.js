// localStorage can throw (private mode, blocked cookies) — the site must still work
function loadLang(){
  try{ const l = localStorage.getItem('lang'); return dict[l] ? l : 'ru'; }catch(e){ return 'ru'; }
}
function saveLang(lang){
  try{ localStorage.setItem('lang',lang); }catch(e){}
}

let curLang = loadLang();

function applyLang(lang){
  curLang = lang;
  saveLang(lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(dict[lang] && dict[lang][k] !== undefined){
      el.innerHTML = dict[lang][k];
    }
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el=>{
    const k = el.getAttribute('data-i18n-label');
    if(dict[lang] && dict[lang][k] !== undefined) el.setAttribute('aria-label', dict[lang][k]);
  });
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  renderReviews();
}

document.querySelectorAll('.lang-switch button').forEach(b=>{
  b.addEventListener('click',()=>applyLang(b.dataset.lang));
});

// ============ REVIEWS RENDER ============
// flag of the language the student studied, shown on the avatar
const flagSrc = {en:'img/flags/uk.svg', fr:'img/flags/fr.svg', fi:'img/flags/fi.svg'};
const starsHTML = '<svg class="ic"><use href="#i-star"/></svg>'.repeat(5);

function avatarHTML(r){
  return `${r.init}<img class="rev-flag" src="${flagSrc[r.lang]}" alt="">`;
}

function renderReviews(){
  const grid = document.getElementById('revTrack');
  const keepScroll = grid.scrollLeft; // language switch re-renders: stay on the same slide
  grid.innerHTML = '';
  reviews.forEach((r,i)=>{
    const card = document.createElement('article');
    card.className = 'rev-card';
    card.onclick = ()=>{ if(!revDragged) openModal(i); };
    card.innerHTML = `
      <div class="rev-head">
        <div class="rev-meta">
          <div class="rev-avatar">${avatarHTML(r)}</div>
          <div class="rev-name">${r.name[curLang]}<small>${r.from[curLang]}</small></div>
        </div>
        <div class="rev-stars" aria-label="5/5">${starsHTML}</div>
      </div>
      <div class="rev-quote">«${r.short[curLang]}»</div>
      <div class="rev-foot">
        <span class="more">${dict[curLang]['rev.more']}</span>
      </div>
    `;
    grid.appendChild(card);
  });
  grid.scrollLeft = keepScroll;
  buildRevDots();
}

// ============ REVIEWS SLIDER ============
// one slide = one card width + gap; the CSS decides how many cards fit (3 / 2 / 1 + peek)
const revTrack = document.getElementById('revTrack');
const revDots = document.getElementById('revDots');
const revPrev = document.getElementById('revPrev');
const revNext = document.getElementById('revNext');

function revStep(){
  const card = revTrack.firstElementChild;
  return card ? card.offsetWidth + parseFloat(getComputedStyle(revTrack).columnGap) : 1;
}
function revMaxScroll(){ return revTrack.scrollWidth - revTrack.clientWidth; }
// number of distinct snap positions: the last cards can't each start a slide
function revPositions(){ return Math.ceil(revMaxScroll() / revStep() - 0.05) + 1; }
function revIndex(){
  if(revTrack.scrollLeft >= revMaxScroll() - 2) return revPositions() - 1;
  return Math.round(revTrack.scrollLeft / revStep());
}
function revGo(i){ revTrack.scrollTo({left:i * revStep(), behavior:'smooth'}); }

function buildRevDots(){
  const n = revPositions();
  revDots.innerHTML = '';
  for(let i = 0; i < n; i++){
    const b = document.createElement('button');
    b.setAttribute('aria-label', `${i + 1} / ${n}`);
    b.onclick = ()=>revGo(i);
    revDots.appendChild(b);
  }
  // nothing to slide (everything fits) -> hide the controls
  revDots.parentElement.style.display = n > 1 ? '' : 'none';
  updateRevNav();
}
function updateRevNav(){
  const i = revIndex();
  [...revDots.children].forEach((d,k)=>d.classList.toggle('active', k === i));
  revPrev.disabled = revTrack.scrollLeft <= 2;
  revNext.disabled = revTrack.scrollLeft >= revMaxScroll() - 2;
}
revPrev.addEventListener('click',()=>revGo(revIndex() - 1));
revNext.addEventListener('click',()=>revGo(revIndex() + 1));
revTrack.addEventListener('scroll',updateRevNav,{passive:true});

// mouse drag-to-scroll on desktop (touch already swipes natively)
let revDrag = null;
let revDragged = false; // swallows the click that ends a drag, so it doesn't open the modal
let revGlide = 0;
// own glide instead of smooth scrollTo: snap must stay off until we arrive, otherwise
// the browser re-snaps to the nearest card mid-way, and native smooth scroll gives no reliable "done"
function revGlideTo(goal){
  const from = revTrack.scrollLeft, t0 = performance.now(), dur = 320;
  const tick = now=>{
    const k = Math.min(1, (now - t0) / dur);
    revTrack.scrollLeft = from + (goal - from) * (1 - Math.pow(1 - k, 3)); // ease-out
    if(k < 1) revGlide = requestAnimationFrame(tick);
    else revTrack.classList.remove('nosnap');
  };
  revGlide = requestAnimationFrame(tick);
}
revTrack.addEventListener('pointerdown',e=>{
  if(e.pointerType !== 'mouse' || e.button !== 0) return;
  e.preventDefault(); // no text selection / native image drag
  cancelAnimationFrame(revGlide);
  revDrag = {x:e.clientX, left:revTrack.scrollLeft, moved:false};
});
window.addEventListener('pointermove',e=>{
  if(!revDrag) return;
  const dx = e.clientX - revDrag.x;
  if(!revDrag.moved){
    if(Math.abs(dx) < 5) return; // tiny jitter is still a click
    revDrag.moved = true;
    revTrack.classList.add('dragging','nosnap');
  }
  revTrack.scrollLeft = revDrag.left - dx;
});
window.addEventListener('pointerup',()=>{
  if(!revDrag) return;
  if(revDrag.moved){
    // settle on a slide, leaning in the drag direction so a short pull still turns the page
    const pos = revTrack.scrollLeft / revStep();
    const forward = revTrack.scrollLeft > revDrag.left;
    const target = forward ? Math.ceil(pos - 0.15) : Math.floor(pos + 0.15);
    revTrack.classList.remove('dragging');
    const i = Math.max(0, Math.min(target, revPositions() - 1));
    revGlideTo(Math.min(i * revStep(), revMaxScroll()));
    revDragged = true;
    setTimeout(()=>{ revDragged = false; });
  }else{
    revTrack.classList.remove('nosnap'); // a click that stopped a glide mid-way
  }
  revDrag = null;
});
window.addEventListener('resize',buildRevDots);

function openModal(i){
  const r = reviews[i];
  document.getElementById('mAvatar').innerHTML = avatarHTML(r);
  document.getElementById('mStars').innerHTML = starsHTML;
  document.getElementById('mNm').textContent = r.name[curLang];
  document.getElementById('mFrom').textContent = r.from[curLang];
  document.getElementById('mBody').textContent = r.full[curLang];
  document.getElementById('reviewModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('reviewModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('reviewModal').addEventListener('click',e=>{
  if(e.target === e.currentTarget) closeModal();
});
document.getElementById('modalClose').addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal()});

// ============ NAV ============
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(t){
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth',block:'start'});
      document.getElementById('navLinks').classList.remove('open');
    }
  });
});

// init
applyLang(curLang);
