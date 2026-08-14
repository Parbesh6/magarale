/* =========================================================
   PERFECT ACADEMY — REVIEWS.JS
   Rating bar animation + review submission form (demo)
   ========================================================= */

$(function () {

  /* ---------- Animate rating bars on scroll ---------- */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const $bar = $(entry.target);
        const width = $bar.data('width');
        $bar.css('width', width + '%');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.rating-bar-fill').forEach((el) => barObserver.observe(el));

  /* ---------- Star rating input ---------- */
  const $stars = $('#starRating i');
  let selectedRating = 0;

  $stars.on('mouseenter', function () {
    highlightStars($(this).data('value'));
  });
  $('#starRating').on('mouseleave', function () {
    highlightStars(selectedRating);
  });
  $stars.on('click', function () {
    selectedRating = $(this).data('value');
    $('#ratingValue').val(selectedRating);
    highlightStars(selectedRating);
  });
  function highlightStars(value) {
    $stars.each(function () {
      const starVal = $(this).data('value');
      $(this)
        .toggleClass('bi-star-fill', starVal <= value)
        .toggleClass('bi-star', starVal > value);
    });
  }

  /* ---------- Review form validation (frontend demo) ---------- */
  const $reviewForm = $('#reviewForm');
  if ($reviewForm.length) {
    $reviewForm.on('submit', function (e) {
      e.preventDefault();
      let valid = true;

      $reviewForm.find('[required]').each(function () {
        if (!$(this).val() || !$(this).val().trim()) {
          $(this).addClass('is-invalid-pa');
          valid = false;
        } else {
          $(this).removeClass('is-invalid-pa');
        }
      });

      if (selectedRating === 0) {
        $('#starRatingError').show();
        valid = false;
      } else {
        $('#starRatingError').hide();
      }

      if (valid) {
        $('#reviewSuccessMsg').fadeIn();
        $reviewForm[0].reset();
        selectedRating = 0;
        highlightStars(0);
        setTimeout(() => $('#reviewSuccessMsg').fadeOut(), 4000);
      }
    });

    $reviewForm.find('input, textarea, select').on('input change', function () {
      $(this).removeClass('is-invalid-pa');
    });
  }

});
