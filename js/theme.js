// Theme toggle functionality
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (savedTheme === 'dark') {
  html.classList.add('dark');
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    // Update icon display
    function updateThemeIcon() {
      const isDark = html.classList.contains('dark');
      const sunIcon = themeToggle.querySelector('.sun-icon');
      const moonIcon = themeToggle.querySelector('.moon-icon');

      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
      }
    }

    // Set initial icon state
    updateThemeIcon();

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }
});
