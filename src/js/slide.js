import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import "../scss/object/project/_slide.scss";

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar

  });