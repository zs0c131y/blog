// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
  html.classList.add('dark');
}

// Update icon display based on theme
function updateThemeIcon() {
  const sunIcon = themeToggle?.querySelector('.sun-icon');
  const moonIcon = themeToggle?.querySelector('.moon-icon');

  if (sunIcon && moonIcon) {
    const isDark = html.classList.contains('dark');
    sunIcon.style.display = isDark ? 'none' : 'block';
    moonIcon.style.display = isDark ? 'block' : 'none';
  }
}

// Initialize icons after Lucide loads
if (window.lucide) {
  lucide.createIcons();
  updateThemeIcon();
}

// Also update on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  updateThemeIcon();
});

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');

    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    updateThemeIcon();
  });
}
