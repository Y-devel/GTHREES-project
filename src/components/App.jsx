import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Авиаперевозки", image: "photo-1436491865332-7a61a109cc05", tag: "01 / СКОРОСТЬ" },
  { title: "Автомобильные перевозки", image: "photo-1519003722824-194d4455a60c", tag: "02 / ГИБКОСТЬ" },
  { title: "Железнодорожные перевозки", image: "photo-1474487548417-781cb71495f3", tag: "03 / НАДЁЖНОСТЬ" },
  { title: "Морские перевозки", image: "photo-1578575437130-527eed3abbec", tag: "04 / МАСШТАБ" },
];

const faqs = [
  "Как доставить груз из любой точки мира?",
  "Какие документы нужны для международной перевозки?",
  "Как рассчитывается стоимость доставки?",
  "Можно ли отслеживать груз в пути?",
];

const partners = ["segezha group", "ТЕХНОНИКОЛЬ", "red october", "СИБУР", "СТАЛЬМЕТИЗ"];

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className={diagonal ? "arrow diagonal" : "arrow"}><path d="M2 8h11M8 3l5 5-5 5" /></svg>;
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 34, opacity: 0, duration: 1, stagger: 0.14, ease: "power3.out", delay: 0.2 });
      gsap.utils.toArray(".reveal").forEach((el) => gsap.fromTo(el, { y: 44, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 84%", once: true }
      }));
      gsap.utils.toArray(".stack-band").forEach((el, i) => {
        if (i === 0) return;
        ScrollTrigger.create({ trigger: el, start: "top top", end: "+=180", pin: true, pinSpacing: true, scrub: 0.5 });
      });
      gsap.to(".hero-photo", { yPercent: 16, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <main>
    <header className="site-header">
      <a href="#home" className="brand" aria-label="GTHREES — на главную"><span className="brand-mark">GTHREES</span><span className="brand-caption">LOGISTICS</span></a>
      <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Главная навигация">
        {[["Услуги", "#services"], ["О компании", "#about"], ["Партнёры", "#partners"], ["Новости", "#news"], ["Контакты", "#contact"]].map(([name, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Оставить заявку <Arrow diagonal /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню"><span></span><span></span></button>
    </header>

    <section className="hero" id="home">
      <div className="hero-photo" style={{ backgroundImage: "linear-gradient(90deg, rgba(3,35,72,.96) 0%, rgba(3,35,72,.72) 43%, rgba(3,35,72,.12) 100%), url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85)" }} />
      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-wordmark">GTHREES</div>
          <p className="eyebrow">ЛОГИСТИКА БЕЗ ГРАНИЦ</p>
          <h1>Транспортно-<br />экспедиционная<br /><em>компания</em></h1>
          <p className="hero-description">Соединяем бизнес и мир. Организуем перевозки любой сложности, чтобы ваш груз всегда был на правильном пути.</p>
          <a className="round-link" href="#services" aria-label="Посмотреть услуги"><Arrow diagonal /></a>
        </div>
        <div className="hero-bottom"><span>01 — 04</span><span>МЕЖДУНАРОДНЫЕ ПЕРЕВОЗКИ</span><a href="#achievements">ЛИСТАЙТЕ ВНИЗ ↓</a></div>
      </div>
    </section>

    <section className="achievements section-pad" id="achievements">
      <div className="section-heading reveal"><span className="eyebrow">GTHREES В ЦИФРАХ</span><h2>Наши достижения</h2></div>
      <div className="stats reveal">
        {[["61", "мин.", "Частота запусков"], ["287", "тыс.", "Грузов перевезено"], ["3 165", "", "Количество партнёров"], ["42", "млн. км", "Пройденное расстояние"]].map(([n, unit, label]) => <div className="stat" key={label}><span className="stat-label">{label}</span><div><strong>{n}</strong> <small>{unit}</small></div></div>)}
      </div>
    </section>

    <section className="about section-pad" id="about">
      <div className="about-top reveal"><div><span className="eyebrow">НАША ГЕОГРАФИЯ</span><h2>О компании</h2></div><p>Наша компания предоставляет широкий спектр услуг по доставке грузов наземным, воздушным и водным транспортом, создавая эффективные и прозрачные решения. Открываем новые торговые маршруты и выстраиваем партнёрские стратегии, обеспечивая высокий уровень сервиса.</p></div>
      <div className="map-wrap reveal" role="img" aria-label="Схема международных логистических маршрутов"><svg className="world-map" viewBox="0 0 1000 420" aria-hidden="true"><g className="land"><path d="M78 94 112 61l62-19 38 13 24 31 46 9 25 28-22 20-10 36-29 18-6 31-30 8-19 42-28-9-19-32-28-15-10-35-34-10-13-37-24-17z"/><path d="m258 230 37 12 24 36-8 40-25 22-10 45-20 32-16-20 4-38-22-34 7-38-20-30z"/><path d="m454 93 27-20 32 7 10 22-24 19-29-4z"/><path d="m474 134 51-15 39 23-8 42-27 38-14 51-26 33-17-43-24-29 10-45-17-26z"/><path d="m512 80 65-25 69 14 41 29 55-5 54 28-7 24-62 3-42 32-40-8-25 29-35-4-15-38-40-17-13-32-32-9z"/><path d="m674 245 41-21 50 12 33 30-19 30-42 12-38-22-29-5z"/><path d="m812 192 23-14 26 10-4 27-22 13-24-14z"/></g><g className="routes"><path d="M200 160 Q420 40 610 130"/><path d="M520 180 Q660 105 780 150"/><path d="M300 190 Q470 290 710 250"/></g><g className="route-dots"><circle cx="200" cy="160" r="5"/><circle cx="610" cy="130" r="5"/><circle cx="520" cy="180" r="5"/><circle cx="780" cy="150" r="5"/><circle cx="300" cy="190" r="5"/><circle cx="710" cy="250" r="5"/></g></svg><div className="map-pin pin-one">Европа <b>↗</b></div><div className="map-pin pin-two">Азия <b>↗</b></div><div className="map-caption">МАРШРУТЫ<br />В 80+ СТРАН</div></div>
      <a className="text-link" href="#contact">Узнать больше <Arrow diagonal /></a>
    </section>

    <section className="services stack-band" id="services">
      <div className="section-inner">
        <div className="service-head reveal"><div><span className="eyebrow light">ЧТО МЫ ДЕЛАЕМ</span><h2>Наши услуги</h2></div><p>Полный комплекс логистических решений<br />для вашего бизнеса — от двери до двери.</p><a className="text-link light-link" href="#contact">Все услуги <Arrow diagonal /></a></div>
        <div className="service-grid">{services.map((s, i) => <button key={s.title} onMouseEnter={() => setActiveService(i)} onFocus={() => setActiveService(i)} onClick={() => setActiveService(i)} className={activeService === i ? "service-card selected" : "service-card"} style={{ "--service-image": "url(https://images.unsplash.com/" + s.image + "?auto=format&fit=crop&w=900&q=85)" }}><span className="service-tag">{s.tag}</span><span className="service-title">{s.title}</span><span className="service-arrow"><Arrow diagonal /></span></button>)}</div>
        <div className="service-progress"><span style={{ width: (25 * (activeService + 1)) + "%" }} /></div>
      </div>
    </section>

    <section className="why section-pad stack-band">
      <div className="why-title reveal"><span className="eyebrow">НАШ ПОДХОД</span><h2>Почему мы</h2><p>Каждая деталь под контролем.<br />Каждый маршрут — продуман.</p></div>
      <div className="benefits">{[["01", "Гарантия сохранности", "Берём ответственность за груз на каждом этапе пути."], ["02", "Экологические стандарты", "Выбираем решения с заботой о будущем планеты."], ["03", "Индивидуальный подход", "Подбираем оптимальный маршрут под вашу задачу."], ["04", "Высокое качество услуг", "Команда экспертов всегда на связи и готова помочь."]].map(([num, title, copy], i) => <article className={"benefit reveal benefit-" + i} key={num}><span className="benefit-num">{num}</span><div><h3>{title}</h3><p>{copy}</p></div><span className="benefit-corner"><Arrow diagonal /></span></article>)}</div>
    </section>

    <section className="partners section-pad" id="partners">
      <div className="partner-intro reveal"><div><span className="eyebrow">ВМЕСТЕ СИЛЬНЕЕ</span><h2>Партнёры</h2></div><p>Благодаря тесному сотрудничеству с ведущими транспортными компаниями мы способны предложить качественный и эффективный логистический сервис, привлечь инновационные подходы и экспертизу.</p></div>
      <div className="partner-filters reveal"><span className="filter-active">Все</span><span>Производство</span><span>Промышленность</span><span>Ритейл</span><span>Строительство</span><span>Агропромышленность</span></div>
      <div className="partner-grid reveal"><div className="partner-photo"></div>{partners.map((p, i) => <div className={"partner-logo logo-" + i} key={p}>{p}</div>)}</div>
    </section>

    <section className="news stack-band" id="news">
      <div className="news-inner section-pad">
        <div className="news-copy reveal"><span className="eyebrow light">СОБЫТИЯ И ОБНОВЛЕНИЯ</span><h2>Новости</h2><div className="news-list">{["Как застраховать груз на международном направлении?", "Новые маршруты: расширяем географию доставки", "GTHREES на международной логистической выставке", "Обновление автопарка и экологичные решения"].map((n, i) => <a href="#contact" key={n}><span>{n}</span><small>0{i + 1} / 2025</small><Arrow diagonal /></a>)}</div><a href="#news" className="text-link light-link">Все новости <Arrow diagonal /></a></div>
        <div className="news-feature reveal"><img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1200&q=85" alt="Контейнерный корабль в море" /><span>НОВОСТИ КОМПАНИИ · 12.09.2025</span></div>
      </div>
    </section>

    <section className="faq section-pad">
      <div className="faq-heading reveal"><span className="eyebrow">ЕСТЬ ВОПРОСЫ?</span><h2>Часто спрашивают</h2></div>
      <div className="faq-list reveal">{faqs.map((q, i) => <article className={activeFaq === i ? "faq-item active" : "faq-item"} key={q}><button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} aria-expanded={activeFaq === i}><span>{q}</span><span className="faq-plus">{activeFaq === i ? "−" : "+"}</span></button><div className="faq-answer" aria-hidden={activeFaq !== i}><p>{activeFaq === i && "Мы подберём подходящий маршрут, подготовим документы и будем сопровождать груз на каждом этапе. Оставьте заявку — наш специалист свяжется с вами и подробно ответит на все вопросы."}</p></div></article>)}</div>
    </section>

    <section className="contact stack-band" id="contact">
      <div className="contact-inner section-pad">
        <div className="contact-copy reveal"><span className="eyebrow light">НА СВЯЗИ 24/7</span><h2>Связаться<br />с нами</h2><p>Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время.</p><div className="contact-phone"><small>ЗВОНИТЕ НАМ</small><a href="tel:+375171252225">+375 (17) 125-22-25</a></div></div>
        <form className="contact-form reveal" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Ваше имя<input required placeholder="Как к вам обращаться?" /></label><label>Телефон или email<input required type="text" placeholder="+375 (__) ___-__-__" /></label><label>Сообщение<textarea rows="2" placeholder="Расскажите о вашей задаче" /></label><button type="submit" className="submit-button">{sent ? "Заявка отправлена ✓" : "Отправить заявку"} <Arrow diagonal /></button><small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</small></form>
      </div>
      <footer className="footer section-pad"><a href="#home" className="brand footer-brand"><span className="brand-mark">GTHREES</span><span className="brand-caption">LOGISTICS</span></a><span>© 2025 GTHREES. Все права защищены.</span><div><a href="#contact">Политика конфиденциальности</a><a href="#home">Наверх ↑</a></div></footer>
    </section>
  </main>;
}
