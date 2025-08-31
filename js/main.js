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
      $(".dashboard-sidebar").addClass("active");
      $("body").addClass("overflow");
      $(".overlay").fadeIn();
    });
    $(".close-btn,.overlay").click(function () {
      $(".header-nav").removeClass("active");
      $(".dashboard-sidebar").removeClass("active");
      $("body").removeClass("overflow");
      $(".overlay").fadeOut();
    });
  }

  /***** main slider *****/
  if (typeof Swiper !== "undefined") {
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
  }

  /***** testimonials slider *****/
  if (typeof Swiper !== "undefined") {
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
  }

  /***** Sidebar *****/
  $(".has-children .sidebar_menu-link").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).siblings(".sidebar_children").slideToggle();
  });

  /***** Form *****/
  let input = $("input[type=tel][intlTelInput]");
  if (input.length > 0) {
    for (let i = 0; i < input.length; i++) {
      intlTelInput(input[i], {
        utilsScript: "/js/utils.js",
        autoPlaceholder: "aggressive",
        separateDialCode: true,
        initialCountry: "sa",
        preferredCountries: ["sa", "kw", "ae", "bh", "om", "qa"],
      });
    }
  }
  $(".password-toggle").on("click", function (e) {
    e.preventDefault();
    const input = $(this)
      .closest(".password-content")
      .find("input.form-control");
    const isPassword = input.attr("type") === "password";
    input.attr("type", isPassword ? "text" : "password");
    $(this).toggleClass("active", isPassword);
  });

  if (typeof select2 !== "undefined") {
    if ($(window).width() >= 992) {
      $("select[select2]").select2({
        minimumResultsForSearch: Infinity,
      });
    }
  }

  $(".file-content input[type=file]").change(function () {
    let file_val;
    if ($(this).val() == "") {
      file_val = "";
    } else {
      file_val = splitFileName($(this).prop("files")[0].name);
    }
    $(this).parent(".file-content").find(".file-name").html(file_val[0]);
    $(this)
      .parent(".file-content")
      .find(".file-type")
      .html("." + file_val[1]);
  });

  /***** Form Stepper *****/
  if ($("#registerForm").length > 0) {
    window.registerForm = new Stepper(document.querySelector("#registerForm"), {
      linear: false,
      animation: true,
    });
  }
  $(".btnNext").click(function () {
    const nextTabLinkEl = $(".account-tabs .active").next("button")[0];
    const nextTab = new bootstrap.Tab(nextTabLinkEl);
    nextTab.show();
  });

  /***** OTP *****/
  const inputs = $("#otp-input input");

  inputs.on("input", function () {
    const index = inputs.index(this);

    // handling normal input
    if (this.value.length == 1 && index + 1 < inputs.length) {
      $(inputs[index + 1]).removeAttr("disabled");
      inputs[index + 1].focus();
    } else {
      inputs.blur();
      $(".otp-content .submit-btn").removeAttr("disabled");
    }

    // if a value is pasted, put each character to each of the next input
    if (this.value.length > 1) {
      // sanitize input
      if (isNaN(this.value)) {
        this.value = "";
        updateInput();
        return;
      }

      // split characters to array
      const chars = this.value.split("");

      $.each(chars, function (pos) {
        // if length exceeded the number of inputs, stop
        if (pos + index >= inputs.length) return false;

        // paste value
        let targetInput = inputs[pos + index];
        targetInput.value = chars[pos];
      });

      // focus the input next to the last pasted character
      let focusIndex = Math.min(inputs.length - 1, index + chars.length);
      inputs[focusIndex].focus();
    }
    updateInput();
  });

  inputs.on("keydown", function (e) {
    const index = inputs.index(this);

    // backspace button
    if (e.keyCode == 8 && this.value == "" && index != 0) {
      // shift next values towards the left
      for (let pos = index; pos < inputs.length - 1; pos++) {
        inputs[pos].value = inputs[pos + 1].value;
      }

      // clear previous box and focus on it
      inputs[index - 1].value = "";
      inputs[index - 1].focus();
      updateInput();
      return;
    }

    // delete button
    if (e.keyCode == 46 && index != inputs.length - 1) {
      // shift next values towards the left
      for (let pos = index; pos < inputs.length - 1; pos++) {
        inputs[pos].value = inputs[pos + 1].value;
      }

      // clear the last box
      inputs[inputs.length - 1].value = "";
      this.select();
      e.preventDefault();
      updateInput();
      return;
    }

    // left button
    if (e.keyCode == 37) {
      if (index > 0) {
        e.preventDefault();
        inputs[index - 1].focus();
        inputs[index - 1].select();
      }
      return;
    }

    // right button
    if (e.keyCode == 39) {
      if (index + 1 < inputs.length) {
        e.preventDefault();
        inputs[index + 1].focus();
        inputs[index + 1].select();
      }
      return;
    }
  });

  function updateInput() {
    let inputValue = inputs.toArray().reduce(function (otp, input) {
      otp += input.value.length ? input.value : " ";
      return otp;
    }, "");
    $("input[name=otp]").val(inputValue);
  }
});

function splitFileName(filename) {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return [filename];
  return [filename.slice(0, lastDot), filename.slice(lastDot + 1)];
}
