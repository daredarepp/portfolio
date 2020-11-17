window.addEventListener("load", function loadHandler() {
  const mqSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const supportsSystemTheme = 
    mqSystemDarkTheme.media === '(prefers-color-scheme: dark)';
  const previouslySavedTheme = localStorage.theme;
  const themePicker = document.querySelector('.js-theme-picker');
  // TODO: HIDE BRIEF FLASH OF INITIAL THEME ON PAGE LOAD (currently all good when initial theme is keeped)
  
  // Set initial theme
  if (previouslySavedTheme) {
    setTheme(previouslySavedTheme, true);
  } else {
    setTheme(supportsSystemTheme ? 'system' : 'light', true);
  }

  // Hide option if system theme not supported
  if (!supportsSystemTheme) {
    themePicker.querySelector('[value="system"]').remove();
  }

  themePicker.addEventListener('change', (ev) => {
    console.log('theme picker, change to theme: ', ev.target.value);
    let newTheme = ev.target.value;
    setTheme(newTheme);
  })

  function setTheme(theme, syncPicker) {
    if (theme === 'system') {
      mqSystemDarkTheme.onchange = () => {
        toggleDarkMode(mqSystemDarkTheme.matches);
      }
      toggleDarkMode(mqSystemDarkTheme.matches);
    } else {
      mqSystemDarkTheme.onchange = null;
      toggleDarkMode(theme === 'dark');
    }
    localStorage.theme = theme;

    if (syncPicker) {
      themePicker.querySelector(`[value=${theme}]`).checked = true;
    }
  }

  function toggleDarkMode(dark) {
    if (dark) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }


  // Activate slider
  const slider = new KeenSlider("#slider", {
    slidesPerView: 3,
    // loop: true,
    spacing: 20,
    // centered: true,
    created: function (instance) {
      document
        .getElementById("arrow-left")
        .addEventListener("click", function () {
          instance.prev()
        })
  
      document
        .getElementById("arrow-right")
        .addEventListener("click", function () {
          instance.next()
        })
      var dots_wrapper = document.getElementById("dots")
      var slides = document.querySelectorAll(".keen-slider__slide")
      slides.forEach(function (t, idx) {
        var dot = document.createElement("button")
        dot.classList.add("dot")
        dots_wrapper.appendChild(dot)
        dot.addEventListener("click", function () {
          instance.moveToSlide(idx)
        })
      })
      updateClasses(instance);
    }
  })
  
  function updateClasses(instance) {
    var slide = instance.details().relativeSlide
    var arrowLeft = document.getElementById("arrow-left")
    var arrowRight = document.getElementById("arrow-right")
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled")
    slide === instance.details().size - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled")
  
    var dots = document.querySelectorAll(".dot")
    dots.forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }
});
