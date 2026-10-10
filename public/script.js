(function () {
  const scrollContainer = document.querySelector('[data-scroll-container]');
  const links = Array.from(document.querySelectorAll('.section-link'));
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();

      if (window.matchMedia('(min-width: 992px)').matches) {
        scrollContainer.scrollTo({
          top: target.offsetTop - 18,
          behavior: 'smooth'
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function getTimeLabel(dateStart, now = new Date()) {
    const start = new Date(dateStart);
    const elapsedMs = now - start;

    if (elapsedMs < 0 || isNaN(elapsedMs)) {
      // throw new Error("Starting date cannot be in the future");
      return null;
    }

    let years = now.getFullYear() - start.getFullYear();

    const anniversary = new Date(start);
    anniversary.setFullYear(start.getFullYear() + years);

    if (anniversary > now) {
      years--;
    }

    const lastAnniversary = new Date(start);
    lastAnniversary.setFullYear(start.getFullYear() + years);

    const nextAnniversary = new Date(start);
    nextAnniversary.setFullYear(start.getFullYear() + years + 1);

    const yearFraction = years + (now - lastAnniversary) / (nextAnniversary - lastAnniversary);

    const period = Math.floor(yearFraction);

    if (period < 1) {
      return "less than 1 year";
    }

    if (yearFraction >= period + 0.5) {
      return `nearly ${period + 1} ${period + 1 === 1 ? "year" : "years"}`;
    }

    return `over ${period} ${period === 1 ? "year" : "years"}`;
  }

  const timeServed = document.getElementById('time-served');

  // Technically started July 2022, this accounts for spare time
  // Also technically technically this will count up forever,
  // wonder how accurate this will be in the future
  const timeServedText = getTimeLabel(new Date("2024-03-01"));
  if (timeServedText) {
    timeServed.textContent = timeServedText;
  }
})();
