// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileNavToggle) {
  mobileNavToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close mobile menu when clicking a link
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only prevent default for same-page anchors
    if (href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 60;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks) {
          navLinks.classList.remove("active");
        }
      }
    }
  });
});
