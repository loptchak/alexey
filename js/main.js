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
  const grid = document.getElementById('revGrid');
  grid.innerHTML = '';
  reviews.forEach((r,i)=>{
    const card = document.createElement('article');
    card.className = 'rev-card';
    card.onclick = ()=>openModal(i);
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
}

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
