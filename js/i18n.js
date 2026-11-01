// ============ I18N ============
const dict = {
  ru: {
    'brand.role':'репетитор · языки',
    'nav.languages':'Языки','nav.about':'Обо мне','nav.why':'Подход','nav.pricing':'Цена','nav.reviews':'Отзывы','nav.contact':'Контакты',

    'hero.eyebrow':'Online · 2020 — настоящее',
    'hero.title.1':'Учу говорить на','hero.title.2':'английском','hero.title.comma':',','hero.title.3':'французском','hero.title.and':'и','hero.title.4':'финском',
    'hero.lead':'Индивидуальные занятия для взрослых и подростков. Программа подбирается под ваши цели — экзамен, путешествие, работа или просто радость свободно понимать',
    'hero.cta':'Записаться на урок','hero.cta2':'Посмотреть программу',
    'hero.card.zoom':'через Zoom','hero.card.stamp':'Онлайн-урок','hero.card.who':'репетитор · с 2020','hero.card.yrs':'лет',

    'lang.eyebrow':'Языки','lang.h.1':'Три языка,','lang.h.2':'три разговора','lang.lead':'Каждое направление — со своей методикой, материалами и культурным контекстом. Можно сочетать',
    'lang.en.ru':'Английский язык','lang.en.desc':'Подготовка к IELTS, TOEFL и школьным экзаменам, разговорная практика, деловой английский. Индивидуальный план под ваш уровень','lang.en.t1':'IELTS / TOEFL','lang.en.t2':'Деловой','lang.en.t3':'Разговорный',
    'lang.fr.ru':'Французский язык','lang.fr.desc':'От базовых основ до продвинутых уровней. Произношение, грамматика и культурный контекст — кино, песни, литература','lang.fr.t1':'DELF / DALF','lang.fr.t2':'Культура','lang.fr.t3':'Грамматика',
    'lang.fi.ru':'Финский язык','lang.fi.desc':'Редкая специализация. Глубокое знание грамматики, падежей и особенностей языка — для жизни, работы и учёбы в Финляндии','lang.fi.t1':'YKI','lang.fi.t2':'Грамматика','lang.fi.t3':'Быт',

    'about.eyebrow':'Обо мне','about.h.1':'Преподаю с','about.h.2':'любопытством','about.lead':'Подход — практичный и человечный: язык как живой инструмент, а не набор правил',
    'about.stat.sup':'+ лет','about.stat.cap':'лет преподавания · 100+ студентов','about.sig':'репетитор · en · fr · fi',
    'about.p1':'<strong>Я репетитор с 5+ годами опыта</strong> преподавания иностранных языков. Помогаю студентам всех уровней достигать своих целей — от первого «hello» до уверенной речи в работе и путешествиях.',
    'about.p2':'Мой подход построен на практическом применении знаний, развитии разговорных навыков и глубоком понимании грамматики. Каждый студент получает программу под свои цели и темп.',
    'method.1.t':'Коммуникативный подход','method.1.d':'Акцент на устную речь и практическое применение с первого урока',
    'method.2.t':'Индивидуализация','method.2.d':'Уроки подстраиваются под ваш темп, цели и стиль обучения',
    'method.3.t':'Современные материалы','method.3.d':'Актуальные учебники, подкасты, фильмы, статьи — а не сухие правила',
    'method.4.t':'Гибкое расписание','method.4.d':'Занятия в удобное время — будни, вечера, выходные',
    'method.5.t':'Поддержка между уроками','method.5.d':'Отвечаю на вопросы и помогаю с домашкой в мессенджере',

    'why.eyebrow':'Почему я','why.h.1':'Шесть причин','why.h.2':'остаться',
    'why.1.t':'Результаты','why.1.d':'Мои студенты сдают экзамены, переезжают, работают на новом языке. Прогресс измеряемый',
    'why.2.t':'Гибкое расписание','why.2.d':'Будни, вечера, выходные. Подстроюсь под ваш ритм жизни и часовой пояс',
    'why.3.t':'Личный подход','why.3.d':'Программа собирается с нуля под вашу цель — без шаблонных «уровней по учебнику»',
    'why.4.t':'Современные методы','why.4.d':'Только то, что действительно работает: общение, иммерсия, осмысленные задания',
    'why.5.t':'Поддержка','why.5.d':'Между уроками — на связи: разберём сложный момент, поможем с заданием',
    'why.6.t':'Чёткие цели','why.6.d':'Вместе определяем, куда идём, и отмечаем прогресс на каждом уроке',

    'price.eyebrow':'Цена','price.h.1':'Договорная,','price.h.2':'прозрачная','price.lead':'Стоимость зависит от языка, формата и количества уроков. Обсудим на знакомстве — оно бесплатное',
    'price.tag':'Индивидуальные занятия','price.title.1':'Свяжитесь','price.title.2':'для обсуждения',
    'price.text':'Первое знакомство — 20 минут бесплатно: определим уровень, цели и подберём формат. Дальше — гибко.',
    'price.f1':'Индивидуальный подход к каждому студенту','price.f2':'Гибкая цена в зависимости от количества уроков','price.f3':'Оплата картой, СБП или криптовалютой','price.f4':'Скидка при покупке пакета занятий',
    'price.pay':'Способы оплаты','price.pay.card':'Карта','price.pay.sbp':'СБП','price.pay.tx':'Перевод','price.fmt.yandex':'Яндекс Телемост','price.cta':'Записаться<br>на знакомство','price.fmt':'Формат',

    'rev.eyebrow':'Отзывы','rev.h.1':'Что говорят','rev.h.2':'студенты','rev.lead':'Реальные отзывы — без правок и витрин. Кликните на карточку, чтобы прочитать целиком',

    'con.eyebrow':'Контакты','con.h.1':'Напишите.','con.h.2':'Ответим быстро.','con.lead':'Удобнее всего — Telegram. Если предпочитаете почту или звонок, всё ниже.',
    'con.platforms':'Платформы · Telegram · Zoom · Яндекс Телемост','con.tg':'Быстрое общение и согласование расписания','con.em':'Подробности о себе и целях обучения','con.phone.l':'Телефон','con.phone':'Звонок или WhatsApp',

    'foot.h.1':'Готовы','foot.h.2':'начать говорить?','foot.l1':'Языки','foot.l2':'Связь',
    'foot.lang.en':'English','foot.lang.fr':'Français','foot.lang.fi':'Suomi',
    'foot.tagline':'Online · English · Français · Suomi',
    'rev.more':'Читать полностью'
  },
  en: {
    'brand.role':'tutor · languages',
    'nav.languages':'Languages','nav.about':'About','nav.why':'Approach','nav.pricing':'Price','nav.reviews':'Reviews','nav.contact':'Contact',

    'hero.eyebrow':'Online · 2020 — present',
    'hero.title.1':'I teach you to speak','hero.title.2':'English','hero.title.comma':',','hero.title.3':'French','hero.title.and':'and','hero.title.4':'Finnish',
    'hero.lead':'One-on-one lessons for adults and teens. Each program is tailored to your goal — an exam, a trip, work, or simply the joy of understanding',
    'hero.cta':'Book a lesson','hero.cta2':'See the program',
    'hero.card.zoom':'via Zoom','hero.card.stamp':'Online lesson','hero.card.who':'tutor · est. 2020','hero.card.yrs':'yrs',

    'lang.eyebrow':'Languages','lang.h.1':'Three languages,','lang.h.2':'three conversations','lang.lead':'Each direction comes with its own method, materials and cultural context. Mix and match welcome',
    'lang.en.ru':'English','lang.en.desc':'Preparation for IELTS, TOEFL and school exams, speaking practice, business English. A plan made for your level','lang.en.t1':'IELTS / TOEFL','lang.en.t2':'Business','lang.en.t3':'Speaking',
    'lang.fr.ru':'French','lang.fr.desc':'From the basics to advanced. Pronunciation, grammar and cultural context — cinema, music, literature','lang.fr.t1':'DELF / DALF','lang.fr.t2':'Culture','lang.fr.t3':'Grammar',
    'lang.fi.ru':'Finnish','lang.fi.desc':'A rare specialization. Deep grasp of grammar, cases and Finnish quirks — for life, work and studies in Finland','lang.fi.t1':'YKI','lang.fi.t2':'Grammar','lang.fi.t3':'Daily life',

    'about.eyebrow':'About','about.h.1':'I teach with','about.h.2':'curiosity.','about.lead':'A practical, human approach: language as a living tool, not a list of rules',
    'about.stat.sup':'+ years','about.stat.cap':'years teaching · 100+ students','about.sig':'tutor · en · fr · fi',
    'about.p1':'<strong>I\'m a tutor with 5+ years of experience</strong> teaching foreign languages. I help students of every level reach their goals — from the first “hello” to confident speech at work or abroad.',
    'about.p2':'My approach focuses on practical use, speaking skills and deep understanding of grammar. Every student gets a program tuned to their goals and pace.',
    'method.1.t':'Communicative approach','method.1.d':'Speaking and real use from the very first lesson',
    'method.2.t':'Individualized','method.2.d':'Lessons adapt to your pace, goals and learning style',
    'method.3.t':'Modern materials','method.3.d':'Current textbooks, podcasts, films, articles — not dry rules',
    'method.4.t':'Flexible schedule','method.4.d':'Lessons whenever suits you — weekdays, evenings, weekends',
    'method.5.t':'Support between lessons','method.5.d':'I answer questions and help with homework in chat',

    'why.eyebrow':'Why me','why.h.1':'Six reasons','why.h.2':'to stay',
    'why.1.t':'Results','why.1.d':'My students pass exams, relocate, work in a new language. Measurable progress',
    'why.2.t':'Flexible schedule','why.2.d':'Weekdays, evenings, weekends — I adapt to your rhythm and time zone',
    'why.3.t':'Personal approach','why.3.d':'A program built from scratch for your goal — not a stock “textbook level”',
    'why.4.t':'Modern methods','why.4.d':'Only what actually works: real conversation, immersion, meaningful tasks',
    'why.5.t':'Support','why.5.d':'Between lessons I stay reachable: we untangle the tricky bit, help with the task',
    'why.6.t':'Clear goals','why.6.d':'We define where we\'re going and mark progress in every lesson',

    'price.eyebrow':'Price','price.h.1':'Negotiable,','price.h.2':'transparent','price.lead':'The price depends on the language, format and lesson count. We\'ll discuss it at the intro call — it\'s free',
    'price.tag':'One-on-one lessons','price.title.1':'Get in touch','price.title.2':'to discuss',
    'price.text':'A free 20-minute intro: we figure out your level, goals and the right format. After that — flexible.',
    'price.f1':'Individual approach to every student','price.f2':'Flexible price based on the lesson count','price.f3':'Card, SBP or cryptocurrency payments','price.f4':'Discount on lesson packages',
    'price.pay':'Payment','price.pay.card':'Card','price.pay.sbp':'SBP','price.pay.tx':'Transfer','price.fmt.yandex':'Yandex Telemost','price.cta':'Book an<br>intro call','price.fmt':'Format',

    'rev.eyebrow':'Reviews','rev.h.1':'What students','rev.h.2':'are saying','rev.lead':'Real reviews — no edits, no showcase. Click a card to read in full',

    'con.eyebrow':'Contact','con.h.1':'Drop a line.','con.h.2':'I reply fast.','con.lead':'Telegram is easiest. Email and phone work too — everything below.',
    'con.platforms':'Platforms · Telegram · Zoom · Yandex Telemost','con.tg':'Quick chats and scheduling','con.em':'Tell me a bit about yourself and your goals','con.phone.l':'Phone','con.phone':'Call or WhatsApp',

    'foot.h.1':'Ready to','foot.h.2':'start speaking?','foot.l1':'Languages','foot.l2':'Contact',
    'foot.lang.en':'English','foot.lang.fr':'Français','foot.lang.fi':'Suomi',
    'foot.tagline':'Online · English · Français · Suomi',
    'rev.more':'Read in full'
  }
};
