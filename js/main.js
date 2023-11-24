/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
// import './_vendor';
// import vars from './_vars';
// import './_functions';
// import './_components';

const burgerEl = document.querySelector('.burger');
const headerEl = document.querySelector('.header');
const miniCartEl = document.querySelector('.mini-cart');
const cartBtnEl = document.querySelector('.header__basket');
const defaultOffset = 120;
let lastScroll = 0;
const scrollPosition = () => window.pageXOffset || document.documentElement.scrollTop;
const containHide = () => headerEl.classList.contains('hide');

// Fixed header
window.addEventListener('scroll', () => {
  if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
    //scroll down
    headerEl.classList.add('hide');
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    headerEl.classList.remove('hide');
    headerEl.classList.add('fixed');
  } else if (scrollPosition() < defaultOffset) {
    headerEl.classList.remove('fixed');
  }
  lastScroll = scrollPosition();
});

// Nav toggle
burgerEl.addEventListener('click', evt => {
  if (!headerEl.classList.contains('mini-cart-show')) {
    document.body.classList.toggle('no-scroll');
  }
  headerEl.classList.toggle('nav-show');
  headerEl.classList.remove('mini-cart-show');
});

// Cart btn
cartBtnEl.addEventListener('click', function (e) {
  if (window.innerWidth <= 1000) {
    if (!headerEl.classList.contains('nav-show')) {
      document.body.classList.toggle('no-scroll');
    }
  }
  headerEl.classList.toggle('mini-cart-show');
  headerEl.classList.remove('nav-show');
});

// Smooth scroll
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(el => {
  el.addEventListener('click', evt => {
    const index = el.href.indexOf('#');
    if (index === -1) {
      return;
    }
    evt.preventDefault();
    const elementId = el.href.slice(index + 1);
    const elementOffset = document.getElementById(elementId).offsetTop;
    headerEl.classList.remove('nav-show');
    document.body.classList.remove('no-scroll');
    if (window.innerWidth <= 414) {
      window.scrollTo({
        top: elementOffset - 56,
        behavior: 'smooth'
      });
      return;
    }
    window.scrollTo({
      top: elementOffset,
      behavior: 'smooth'
    });
  });
});

// Accordion
class Accordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: false,
      duration: 350
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener('click', e => {
      const elHeader = e.target.closest('.accordion__header');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.accordion__item_show');
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
      return;
    }
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('accordion__item_slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('accordion__item_slidedown');
      elBody.classList.add('collapse');
      el.classList.add('accordion__item_show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
      return;
    }
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('accordion__item_show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
  }
}
if (document.querySelector('.accordion') != undefined) {
  document.querySelectorAll('.accordion').forEach(el => {
    new Accordion(el);
  });
}

// Input mask
const maskEl = document.querySelector('.phone');
const maskOptions = {
  mask: '+{7} 000-000-00-00',
  lazy: false
};
if (maskEl) {
  const mask = IMask(maskEl, maskOptions);
}

// Video
const playVideoEl = document.querySelectorAll('.play-video');
if (playVideoEl) {
  playVideoEl.forEach(el => {
    el.addEventListener('click', evt => {
      evt.target.style.display = 'none';
      const videoEl = evt.target.closest('div').querySelector('video');
      videoEl.setAttribute('controls', '');
      videoEl.play();
    });
  });
}
/******/ })()
;
//# sourceMappingURL=main.js.map