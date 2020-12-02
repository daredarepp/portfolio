window.addEventListener("load", function loadHandler() {
  const themePicker = document.querySelector('.js-theme-picker');
  const mediaQueryDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Set initial picker value
  let theme = localStorage.theme || 'system';
  themePicker.querySelector(`[value=${theme}]`).checked = true;

  if (theme === 'system') {
    // Set initial system theme listener
    mediaQueryDarkTheme.onchange = () => {
      toggleDarkMode(mediaQueryDarkTheme.matches);
    }
  }

  themePicker.addEventListener('change', (ev) => {
    let newTheme = ev.target.value;
    localStorage.theme = newTheme;
    if (newTheme === 'system') {
      mediaQueryDarkTheme.onchange = () => {
        toggleDarkMode(mediaQueryDarkTheme.matches);
      }
      toggleDarkMode(mediaQueryDarkTheme.matches);
    } else {
      mediaQueryDarkTheme.onchange = null;
      toggleDarkMode(newTheme === 'dark');
    }
  })

  function toggleDarkMode(dark) {
    if (dark) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }
});
