import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

let howSwiper = null;
let facesSwiper = null;
let gallerySwiper = null;
let feedbackSwiper = null;

const DESKTOP_BREAKPOINT = 1440;

/**
 * Встановлює розміри кастомної пагінації:
 * активний — 6px;
 * наступний — 4px;
 * усі інші — 3px.
 */
function updatePaginationBullets(swiper) {
  const bullets = Array.from(swiper.pagination?.bullets || []);

  if (!bullets.length) return;

  const slidesCount = bullets.length;
  const activeIndex = swiper.realIndex;
  const nextIndex = (activeIndex + 1) % slidesCount;

  bullets.forEach((bullet, index) => {
    bullet.classList.remove(
      'slider-pagination-bullet-next',
      'slider-pagination-bullet-small'
    );

    if (index === activeIndex) return;

    if (index === nextIndex) {
      bullet.classList.add('slider-pagination-bullet-next');
      return;
    }

    bullet.classList.add('slider-pagination-bullet-small');
  });
}

function getPaginationOptions(selector) {
  return {
    el: selector,
    clickable: true,
    bulletClass: 'slider-pagination-bullet',
    bulletActiveClass: 'slider-pagination-bullet-active',
  };
}

function getPaginationEvents() {
  return {
    init(swiper) {
      updatePaginationBullets(swiper);
    },

    slideChange(swiper) {
      updatePaginationBullets(swiper);
    },

    paginationRender(swiper) {
      updatePaginationBullets(swiper);
    },

    paginationUpdate(swiper) {
      updatePaginationBullets(swiper);
    },
  };
}

function initHowSwiper() {
  const swiperElement = document.querySelector('.how-swiper');

  if (!swiperElement || howSwiper) return;

  howSwiper = new Swiper(swiperElement, {
    modules: [Autoplay],

    slidesPerView: 1.37,
    spaceBetween: 16,

    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
}

function initFacesSwiper() {
  const swiperElement = document.querySelector('.faces-swiper');

  if (!swiperElement || facesSwiper) return;

  facesSwiper = new Swiper(swiperElement, {
    modules: [Autoplay, Pagination],

    slidesPerView: 1,
    spaceBetween: 16,

    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: getPaginationOptions('.faces-pagination'),

    on: getPaginationEvents(),
  });
}

function initGallerySwiper() {
  const swiperElement = document.querySelector('.gallery-swiper');

  if (!swiperElement || gallerySwiper) return;

  gallerySwiper = new Swiper(swiperElement, {
    modules: [Autoplay, Pagination],

    /*
     * Центральний слайд повністю видно,
     * частини сусідніх слайдів видно зліва та справа.
     */
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 24,

    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: getPaginationOptions('.gallery-pagination'),

    on: getPaginationEvents(),
  });
}

function initFeedbackSwiper() {
  const swiperElement = document.querySelector('.feedback-swiper');

  if (!swiperElement || feedbackSwiper) return;

  feedbackSwiper = new Swiper(swiperElement, {
    modules: [Autoplay, Pagination],

    slidesPerView: 1.2,
    spaceBetween: 16,

    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: getPaginationOptions('.feedback-pagination'),

    on: getPaginationEvents(),
  });
}

function destroySwiper(swiper) {
  if (!swiper) return null;

  swiper.destroy(true, true);

  return null;
}

function destroyAllSwipers() {
  howSwiper = destroySwiper(howSwiper);
  facesSwiper = destroySwiper(facesSwiper);
  gallerySwiper = destroySwiper(gallerySwiper);
  feedbackSwiper = destroySwiper(feedbackSwiper);
}

function initAllSwipers() {
  initHowSwiper();
  initFacesSwiper();
  initGallerySwiper();
  initFeedbackSwiper();
}

function handleSwipers() {
  if (window.innerWidth < DESKTOP_BREAKPOINT) {
    initAllSwipers();
  } else {
    destroyAllSwipers();
  }
}

document.addEventListener('DOMContentLoaded', handleSwipers);
window.addEventListener('resize', handleSwipers);