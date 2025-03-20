import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import "../scss/object/project/_carousel.scss";

const swiper = new Swiper('#carousel', {
    // Optional parameters
    loop: false,
    slidesPerView: 1, // デフォルトでは一度に表示するスライド数
    spaceBetween: 32, // スライド間の余白
    slidesPerGroup: 1, // 一度にスライドする枚数
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 画面幅に応じたレスポンシブ設定
    breakpoints: {
        // 画面幅が768px以下の場合
        600: {
            slidesPerView: 2,  // 一度に表示するスライド数を1にする
            slidesPerGroup: 1, // 一度にスライドする枚数を1にする
            spaceBetween: 20, // スライド間の余白を調整
        },
        992: {
            slidesPerView: 3,  // 一度に表示するスライド数を1にする
            slidesPerGroup: 1, // 一度にスライドする枚数を1にする
            spaceBetween: 20, // スライド間の余白を調整
        },
    },
});