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


  // Activate slider
  /* const slider = new KeenSlider(".skills-wrapper", {
    slidesPerView: 4,
    slides: '.skill-card',
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
  }) */
  
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
