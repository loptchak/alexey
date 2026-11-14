import ru from './locales/ru.js';
import en from './locales/en.js';

const dictionaries = { ru, en };

function loadLanguage() {
  // Storage can be unavailable in private mode or when cookies are blocked.
  try {
    const language = localStorage.getItem('lang');
    return Object.hasOwn(dictionaries, language) ? language : 'ru';
  } catch {
    return 'ru';
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem('lang', language);
  } catch {
    // Switching languages must still work without persistent storage.
  }
}

export function initLanguageSwitch(onChange) {
  const buttons = document.querySelectorAll('.lang-switch button');

  function applyLanguage(language) {
    if (!Object.hasOwn(dictionaries, language)) return;
    const messages = dictionaries[language];
    saveLanguage(language);
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (messages[key] !== undefined) {
        // These are trusted site translations; some include intentional markup.
        element.innerHTML = messages[key];
      }
    });

    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
      const key = element.dataset.i18nLabel;
      if (messages[key] !== undefined) {
        element.setAttribute('aria-label', messages[key]);
      }
    });

    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === language);
    });
    onChange(language, messages);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  applyLanguage(loadLanguage());
}
