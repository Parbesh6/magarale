/* =========================================================
   PERFECT ACADEMY — COURSES.JS
   Category filtering on the Courses page (no reload)
   ========================================================= */

$(function () {

  const $pills = $('.filter-pill');
  const $courseItems = $('.course-item');

  $pills.on('click', function () {
    $pills.removeClass('active');
    $(this).addClass('active');

    const category = $(this).data('filter');

    $courseItems.each(function () {
      const itemCategory = $(this).data('category');
      const matches = category === 'all' || itemCategory === category;

      if (matches) {
        $(this).fadeIn(300);
      } else {
        $(this).fadeOut(200);
      }
    });

    // Show "no results" message if nothing matches
    setTimeout(() => {
      const visibleCount = $courseItems.filter(function () {
        const itemCategory = $(this).data('category');
        return category === 'all' || itemCategory === category;
      }).length;
      $('#noCoursesMsg').toggle(visibleCount === 0);
    }, 250);
  });

});
