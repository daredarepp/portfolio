"use strict";

/* window.addEventListener('load', function() {
    const str = 'dare';
    const myFn = () => {
        console.log(`${str} is a beastss23`);
    }
    myFn();
}) */
window.addEventListener("load", function loadHandler() {
  var themePicker = document.querySelector('.js-theme-picker');
  var mediaQueryDarkTheme = window.matchMedia('(prefers-color-scheme: dark)'); // Set initial picker value

  var theme = localStorage.theme || 'system';
  themePicker.querySelector("[value=".concat(theme, "]")).checked = true;

  if (theme === 'system') {
    // Set initial system theme listener
    mediaQueryDarkTheme.onchange = function () {
      toggleDarkMode(mediaQueryDarkTheme.matches);
    };
  }

  themePicker.addEventListener('change', function (ev) {
    var newTheme = ev.target.value;
    localStorage.theme = newTheme;

    if (newTheme === 'system') {
      mediaQueryDarkTheme.onchange = function () {
        toggleDarkMode(mediaQueryDarkTheme.matches);
      };

      toggleDarkMode(mediaQueryDarkTheme.matches);
    } else {
      mediaQueryDarkTheme.onchange = null;
      toggleDarkMode(newTheme === 'dark');
    }
  });

  function toggleDarkMode(dark) {
    if (dark) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }
});
