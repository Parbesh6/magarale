/* =========================================================
   PERFECT ACADEMY — VALIDATION.JS
   Contact form validation (frontend demo, no backend)
   ========================================================= */

$(function () {

  const $form = $('#contactForm');
  if (!$form.length) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

  function showError(field, show) {
    const $field = $('#' + field);
    $field.toggleClass('is-invalid-pa', show);
  }

  $form.on('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = $('#cf_name').val().trim();
    const email = $('#cf_email').val().trim();
    const phone = $('#cf_phone').val().trim();
    const course = $('#cf_course').val();
    const subject = $('#cf_subject').val().trim();
    const message = $('#cf_message').val().trim();

    showError('cf_name', name.length < 2);
    if (name.length < 2) valid = false;

    showError('cf_email', !emailRegex.test(email));
    if (!emailRegex.test(email)) valid = false;

    showError('cf_phone', !phoneRegex.test(phone));
    if (!phoneRegex.test(phone)) valid = false;

    showError('cf_course', !course);
    if (!course) valid = false;

    showError('cf_subject', subject.length < 3);
    if (subject.length < 3) valid = false;

    showError('cf_message', message.length < 10);
    if (message.length < 10) valid = false;

    if (valid) {
      $('#contactSuccessMsg').fadeIn();
      $form[0].reset();
      setTimeout(() => $('#contactSuccessMsg').fadeOut(), 4500);
    } else {
      $('#contactSuccessMsg').hide();
    }
  });

  $form.find('input, textarea, select').on('input change', function () {
    $(this).removeClass('is-invalid-pa');
  });

});
