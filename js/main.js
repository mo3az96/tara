$(window).on("load", function () {
  $("body").removeClass("overflow");
});
$(document).ready(function () {
  $(window).scroll(function () {
    $(this).scrollTop() >= 150
      ? $("header.main-header").addClass("fixed")
      : $("header.main-header").removeClass("fixed ");
  });
  /***** Menu *****/
  if ($(window).width() <= 991) {
    $(".menu-btn").click(function () {
      $(".header-nav").addClass("active");
      $("body").addClass("overflow");
      $(".overlay").fadeIn();
    });
    $(".close-btn,.overlay").click(function () {
      $(".header-nav").removeClass("active");
      $("body").removeClass("overflow");
      $(".overlay").fadeOut();
    });
  }

  /***** main slider *****/
  var mainSwiper = new Swiper(".main-slider .swiper", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 10000,
    },
    pagination: {
      el: ".main-slider .swiper-pagination",
      clickable: true,
    },
  });

  /***** testimonials slider *****/
  var testimonialsSwiper = new Swiper(".testimonials-slider .swiper", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".testimonials-slider .swiper-pagination",
      clickable: true,
    },
  });

  /***** Scroll To Top *****/
  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $(".toTop").addClass("showToTop");
    } else {
      $(".toTop").removeClass("showToTop");
    }
  });

  $(".toTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });
});
