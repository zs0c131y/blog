// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
  html.classList.add('dark');
  if (sunIcon && moonIcon) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');

    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  });
}
