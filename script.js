function renderShowcase() {
  const track = document.getElementById("showcase-track");
  const dots = document.getElementById("showcase-dots");
  const marquee = document.getElementById("showcase-marquee");

  if (track) {
    track.innerHTML = showcaseSlides
      .map(
        (slide, index) => `
          <article class="carousel-slide${index === 0 ? " is-active" : ""}" data-slide="${index}">
            <img src="${slide.image}" alt="${slide.title}" loading="${index === 0 ? "eager" : "lazy"}" />
            <div class="carousel-overlay"></div>
            <div class="carousel-content">
              <span class="pill pill-light">${slide.tag}</span>
              <h3>${slide.title}</h3>
              <p>${slide.caption}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (dots) {
    dots.innerHTML = showcaseSlides
      .map(
        (_, index) => `
          <button
            type="button"
            class="carousel-dot${index === 0 ? " is-active" : ""}"
            data-slide-to="${index}"
            role="tab"
            aria-label="Go to slide ${index + 1}"
            aria-selected="${index === 0 ? "true" : "false"}"
          ></button>
        `
      )
      .join("");
  }

  if (marquee) {
    marquee.innerHTML = [...showcaseMarquee, ...showcaseMarquee]
      .map((item) => `<span>${item}</span>`)
      .join("");
  }
}

function renderServices() {
  const container = document.getElementById("services-list");
  if (!container) return;

  container.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <span class="service-icon" aria-hidden="true">${service.icon}</span>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </article>
      `
    )
    .join("");
}

function renderTrainingCards(containerId, items, actionLabel) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <article class="training-card">
          <div class="training-card-top">
            <span class="pill">${item.category}</span>
            <span class="training-date">${item.date}</span>
          </div>
          <h3>${item.title}</h3>
          <ul class="training-meta">
            <li><strong>Time:</strong> ${item.time}</li>
            <li><strong>Venue:</strong> ${item.venue}</li>
            <li><strong>Status:</strong> ${item.seats}</li>
          </ul>
          <button class="text-link" type="button">${actionLabel}</button>
        </article>
      `
    )
    .join("");
}

function renderConductedTrainings() {
  const container = document.getElementById("conducted-trainings");
  if (!container) return;

  container.innerHTML = conductedTrainings
    .map(
      (item) => `
        <article class="conducted-card">
          <div class="conducted-image">
            <img src="${item.image}" alt="${item.title} training session" loading="lazy" />
            <span class="pill pill-light">${item.category}</span>
          </div>
          <div class="conducted-body">
            <time datetime="${item.date}">${item.date}</time>
            <h3>${item.title}</h3>
            <ul class="training-meta">
              <li><strong>Venue:</strong> ${item.venue}</li>
              <li><strong>Attendance:</strong> ${item.participants}</li>
            </ul>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSummary() {
  const summaryContainer = document.getElementById("training-summary");
  const programContainer = document.getElementById("program-highlights");

  if (summaryContainer) {
    summaryContainer.innerHTML = trainingSummary
      .map(
        (item) => `
          <article class="stat-card">
            <strong>${item.value}</strong>
            <h3>${item.label}</h3>
            <p>${item.detail}</p>
          </article>
        `
      )
      .join("");
  }

  if (programContainer) {
    programContainer.innerHTML = programHighlights
      .map(
        (item) => `
          <article class="program-card">
            <div class="program-card-head">
              <h3>${item.title}</h3>
              <span class="pill pill-dark">${item.count}</span>
            </div>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");
  }
}

function renderClientsAndTestimonials() {
  const clientContainer = document.getElementById("client-list");
  const testimonialContainer = document.getElementById("testimonial-list");

  if (clientContainer) {
    clientContainer.innerHTML = clients
      .map(
        (client) => `
          <article class="client-card">
            <div class="client-logo" aria-hidden="true">${client.name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")}</div>
            <h3>${client.name}</h3>
            <p>${client.sector}</p>
          </article>
        `
      )
      .join("");
  }

  if (testimonialContainer) {
    testimonialContainer.innerHTML = testimonials
      .map(
        (item) => `
          <article class="testimonial-card">
            <div class="stars" aria-label="${item.rating} out of 5 stars">${"★".repeat(item.rating)}</div>
            <blockquote>${item.quote}</blockquote>
            <div class="testimonial-author">
              <strong>${item.name}</strong>
              <span>${item.role}, ${item.company}</span>
            </div>
          </article>
        `
      )
      .join("");
  }
}

function setupShowcaseCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotButtons = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    dotButtons.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  function next() {
    goTo(current + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = window.setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (timer) window.clearInterval(timer);
  }

  prevBtn?.addEventListener("click", () => {
    goTo(current - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    startAutoplay();
  });

  dotButtons.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.slideTo));
      startAutoplay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  startAutoplay();
}

function setupRevealAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal, .service-card");

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupTrainingTabs() {
  const tabButtons = document.querySelectorAll(".training-tabs .tab-btn");
  const panels = document.querySelectorAll(".training-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn === button);
        btn.setAttribute("aria-selected", btn === button ? "true" : "false");
      });

      panels.forEach((panel) => {
        const isActive = panel.id.startsWith(target);
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

renderShowcase();
renderServices();
renderTrainingCards("upcoming-trainings", upcomingTrainings, "Register interest");
renderConductedTrainings();
renderSummary();
renderClientsAndTestimonials();
setupShowcaseCarousel();
setupTrainingTabs();
setupRevealAnimations();
setupMobileNav();
