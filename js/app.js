const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Открыть меню");
    navigation.classList.remove("open");
  });
});

const serviceCards = [...document.querySelectorAll(".service-card")];
const progressBar = document.querySelector(".service-progress span");

function selectService(index) {
  serviceCards.forEach((card, cardIndex) => {
    const selected = cardIndex === index;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
  progressBar.style.width = `${((index + 1) / serviceCards.length) * 100}%`;
}

serviceCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => selectService(index));
  card.addEventListener("focus", () => selectService(index));
  card.addEventListener("click", () => selectService(index));
});
selectService(0);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const wasExpanded = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-item button").forEach((item) => {
      item.setAttribute("aria-expanded", "false");
      item.closest(".faq-item").classList.remove("active");
      document.getElementById(item.getAttribute("aria-controls")).hidden = true;
      item.querySelector(".faq-plus").textContent = "+";
    });

    if (!wasExpanded) {
      button.setAttribute("aria-expanded", "true");
      button.closest(".faq-item").classList.add("active");
      document.getElementById(button.getAttribute("aria-controls")).hidden = false;
      button.querySelector(".faq-plus").textContent = "−";
    }
  });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector(".form-status");
  status.textContent = "Спасибо! Ваша заявка подготовлена.";
  event.currentTarget.querySelector(".submit-button").firstChild.textContent = "Заявка отправлена ";
  event.currentTarget.reset();
});

if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-copy > *", {
    y: 34,
    opacity: 0,
    duration: 1,
    stagger: 0.14,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(element, { y: 44, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 84%", once: true },
    });
  });

  gsap.utils.toArray(".stack-band").forEach((element, index) => {
    if (index === 0) return;
    ScrollTrigger.create({ trigger: element, start: "top top", end: "+=180", pin: true, pinSpacing: true, scrub: 0.5 });
  });

  gsap.to(".hero-photo", {
    yPercent: 16,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
