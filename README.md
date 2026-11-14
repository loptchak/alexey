# Сайт Alexey Kazyro

Статический сайт. Источник отзывов — файлы в папке [`feedback`](feedback/README.md). Существующие семь отзывов перенесены туда вместе с переводами и краткими описаниями.

## Однократная настройка GitHub Pages

После загрузки этих изменений в репозиторий откройте **Settings → Pages → Build and deployment → Source → GitHub Actions**. Это необходимо: публикация напрямую из ветки не запускает сборку отзывов.

Workflow `.github/workflows/pages.yml` проверяет pull request, а после push в `main` собирает и публикует сайт. Для первого запуска после изменения настройки можно выбрать **Actions → Build and deploy site → Run workflow → main**. Необходим доступ к настройкам репозитория. Если используется собственный домен, он настраивается в **Settings → Pages**.

Схема: `feedback/*.txt` → проверка и генерация `js/reviews.js` → статические файлы в `_site` → GitHub Pages. Посетителям не нужны запросы к GitHub API или сервер с PHP. При ошибке данных публикация не выполняется.

Официальная документация: [настройка источника публикации GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Локальная проверка

Нужен Node.js 24, дополнительные пакеты не требуются.

```sh
node --test
node scripts/build-site.mjs
```

Откройте `_site/index.html` в браузере или раздайте `_site` любым статическим HTTP-сервером. Для обновления только `js/reviews.js` можно выполнить `node scripts/build-feedback.mjs` и открыть корневой `index.html`.

`js/reviews.js` — сгенерированный файл для локального просмотра; вручную его не редактируют. GitHub Actions заново создаёт его при каждой сборке, поэтому владельцу достаточно менять `.txt`. `_site` исключён из Git. Для другого хостинга используйте команду сборки `node scripts/build-site.mjs` и каталог публикации `_site`.
