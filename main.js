/* =========================================================
   PERFECT ACADEMY — MAIN.JS
   Navbar, smooth scroll, counters, reveal animations,
   back-to-top, sliders (Slick) shared across pages.
   ========================================================= */

$(function () {

  /* ---------- Navbar scroll effect ---------- */
  const $navbar = $('.pa-navbar');
  function handleNavbarScroll() {
    if ($(window).scrollTop() > 40) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  }
  handleNavbarScroll();
  $(window).on('scroll', handleNavbarScroll);

  /* Close mobile menu after a link is tapped */
  $('.pa-navbar .nav-link').on('click', function () {
    const $collapse = $('.navbar-collapse');
    if ($collapse.hasClass('show')) {
      $collapse.collapse('hide');
    }
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this).attr('href');
    if (target === '#' || target === '') return;
    const $target = $(target);
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $target.offset().top - 90 }, 600);
    }
  });

  /* ---------- Animated counters ---------- */
  function animateCounter($el) {
    const target = parseFloat($el.data('count'));
    const suffix = $el.data('suffix') || '';
    const decimals = $el.data('decimals') || 0;
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(decimals);
      $el.text(value + suffix);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter($(entry.target));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---------- Back to top button ---------- */
  const $backToTop = $('#backToTop');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 500) {
      $backToTop.addClass('show');
    } else {
      $backToTop.removeClass('show');
    }
  });
  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* ---------- Course slider (home page) ---------- */
  if ($('.course-slider').length) {
    $('.course-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } }
      ]
    });
  }

  /* ---------- Testimonial slider ---------- */
  if ($('.testimonial-slider').length) {
    $('.testimonial-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1, arrows: false } }
      ]
    });
  }

  /* ---------- Set active nav link based on current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $('.pa-navbar .nav-link').each(function () {
    const href = $(this).attr('href');
    if (href === path) $(this).addClass('active');
  });

});
