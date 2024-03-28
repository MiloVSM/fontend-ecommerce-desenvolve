function sliderConfig(slider) {
  let wrapper, dots, arrowLeft, arrowRight

  // Adiciona elementos de navegação
  function markup(remove) {
    wrapperMarkup(remove)
    arrowMarkup(remove)
    dotMarkup(remove)
  }

  // Remove um elemento do HTML
  function removeElement(elment) {
    if (elment.parentNode) {
      elment.parentNode.removeChild(elment)
    }
  }

  // Cria os elementos HTML
  function createDiv(className) {
    var div = document.createElement("div")
    var classNames = className.split(" ")
    classNames.forEach((name) => div.classList.add(name))
    return div
  }

  // Adiciona setas de navegação
  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft)
      removeElement(arrowRight)
      return
    }
    arrowLeft = createDiv("arrow arrow--left")
    arrowLeft.addEventListener("click", () => slider.prev())
    arrowRight = createDiv("arrow arrow--right")
    arrowRight.addEventListener("click", () => slider.next())

    wrapper.appendChild(arrowLeft)
    wrapper.appendChild(arrowRight)
  }

  // Adiciona o container de navegação
  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper)
      removeElement(wrapper)
      return
    }
    wrapper = createDiv("navigation-wrapper")
    slider.container.parentNode.appendChild(wrapper)
    wrapper.appendChild(slider.container)
  }

  // Adiciona os pontos de navegação
  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots)
      return
    }
    dots = createDiv("dots")
    slider.track.details.slides.forEach((_e) => {
      var dot = createDiv("dot")
      dots.appendChild(dot)
    })
    
    function removeDot(n_dots) {
      for (i = 0; i < n_dots; i++) {
        dots.removeChild(dots.lastChild);
      }
    }

    if (window.matchMedia('(max-width: 800px)').matches) {
       removeDot(0);
    } else if (window.matchMedia('(max-width: 1023px)').matches) {
      removeDot(1);
    } else {
      removeDot(2);
    }
    wrapper.appendChild(dots)
  }


  // Atualiza as classes
  function updateClasses() {
    var slide = slider.track.details.rel
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled")
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled")
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active")
    })
  }

  // Configuração inicial e atualização do slide
  slider.on("created", () => {
    markup()
    updateClasses()
  })
  slider.on("optionsChanged", () => {
    console.log(2)
    markup(true)
    markup()
    updateClasses()
  })
  slider.on("slideChanged", () => {
    updateClasses()
  })
  slider.on("destroyed", () => {
    markup(true)
  })

}

// Atualiza a quantidade de slides por vez na tela
function updateSlidesPerView() {
  let slidesPerView = 3;

  if (window.matchMedia('(max-width: 800px)').matches) {
    slidesPerView = 1;
  } else if (window.matchMedia('(max-width: 1023px)').matches) {
    slidesPerView = 2;
  }

  createSliders(slidesPerView);
}

let slider1;
let slider2;

// Cria os sliders
function createSliders(slidesPerView) {
  if (slider1) {
    slider1.destroy();
  }
  if (slider2) {
    slider2.destroy();
  }

  slider1 = new KeenSlider("#keen-slider-products", { slides: { perView: slidesPerView } }, [sliderConfig]);
  slider2 = new KeenSlider("#keen-slider-products2", { slides: { perView: slidesPerView }}, [sliderConfig]);
}

// Atualização inicial
updateSlidesPerView();

// Atualiza os sliders sempre que a resolução é alterada
window.addEventListener('resize', updateSlidesPerView);
