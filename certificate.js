/* =========================================================
   PERFECT ACADEMY — CERTIFICATE.JS
   Frontend-only certificate verification demo.
   NOTE: This dataset is for demonstration purposes only.
   In production, this should be replaced with a real
   backend/database lookup (e.g. a REST API call).
   ========================================================= */

const CERTIFICATE_DATA = [
  { id: 'PA-2026-000123', name: 'John Doe',        course: 'Graphic Design',            issueDate: '2026-01-14', status: 'Valid'   },
  { id: 'PA-2026-000124', name: 'Sushant Karki',    course: 'Computer Field Training',   issueDate: '2026-01-18', status: 'Valid'   },
  { id: 'PA-2026-000125', name: 'Anisha Gurung',    course: 'Machine Learning',          issueDate: '2026-02-02', status: 'Valid'   },
  { id: 'PA-2026-000126', name: 'Prashant Thapa',   course: 'English Classes',           issueDate: '2026-02-09', status: 'Valid'   },
  { id: 'PA-2026-000127', name: 'Rita Shrestha',    course: 'Digital Marketing',         issueDate: '2026-02-21', status: 'Valid'   },
  { id: 'PA-2026-000128', name: 'Bikash Adhikari',  course: 'Graphic Design',            issueDate: '2026-03-03', status: 'Revoked' },
  { id: 'PA-2026-000129', name: 'Sunita Rai',       course: 'Machine Learning',          issueDate: '2026-03-11', status: 'Valid'   },
  { id: 'PA-2026-000130', name: 'Kiran Magar',      course: 'Computer Field Training',   issueDate: '2026-03-19', status: 'Valid'   },
  { id: 'PA-2026-000131', name: 'Puja Tamang',      course: 'Digital Marketing',         issueDate: '2026-04-02', status: 'Valid'   },
  { id: 'PA-2026-000132', name: 'Nabin Bhattarai',  course: 'English Classes',           issueDate: '2026-04-15', status: 'Valid'   },
  { id: 'PA-2026-000133', name: 'Sabina Lama',      course: 'Graphic Design',            issueDate: '2026-04-27', status: 'Valid'   },
  { id: 'PA-2026-000134', name: 'Rajesh Poudel',    course: 'Machine Learning',          issueDate: '2026-05-06', status: 'Revoked' }
];

$(function () {

  /* ---------- Certificate search / verify ---------- */
  const $form = $('#verifyForm');
  const $input = $('#certIdInput');
  const $result = $('#verifyResult');

  function renderResult(cert) {
    $result.removeClass('valid invalid show');

    if (!cert) {
      $result.addClass('invalid show').html(`
        <div class="verify-badge invalid-badge">
          <i class="bi bi-x-circle-fill"></i> Certificate Not Found
        </div>
        <p class="mb-0" style="color:var(--gray-500);">
          We couldn't find a certificate matching that ID. Please double-check the
          Certificate ID and try again (e.g. <span class="mono">PA-2026-000123</span>).
        </p>
      `);
      return;
    }

    const isValid = cert.status === 'Valid';
    $result.addClass((isValid ? 'valid' : 'invalid') + ' show').html(`
      <div class="verify-badge ${isValid ? 'valid-badge' : 'invalid-badge'}">
        <i class="bi ${isValid ? 'bi-patch-check-fill' : 'bi-exclamation-triangle-fill'}"></i>
        ${isValid ? 'Certificate Verified ✓' : 'Certificate Revoked'}
      </div>
      <div class="verify-grid">
        <div>
          <div class="vg-label">Student</div>
          <div class="vg-value">${cert.name}</div>
        </div>
        <div>
          <div class="vg-label">Course</div>
          <div class="vg-value">${cert.course}</div>
        </div>
        <div>
          <div class="vg-label">Certificate ID</div>
          <div class="vg-value mono">${cert.id}</div>
        </div>
        <div>
          <div class="vg-label">Issue Date</div>
          <div class="vg-value">${cert.issueDate}</div>
        </div>
        <div>
          <div class="vg-label">Status</div>
          <div class="vg-value">${cert.status}</div>
        </div>
        <div>
          <div class="vg-label">Issued By</div>
          <div class="vg-value">Perfect Academy</div>
        </div>
      </div>
    `);
  }

  if ($form.length) {
    $form.on('submit', function (e) {
      e.preventDefault();
      const query = $input.val().trim().toUpperCase();

      if (!query) {
        $input.focus();
        return;
      }

      const match = CERTIFICATE_DATA.find((c) => c.id.toUpperCase() === query);
      renderResult(match);
    });
  }

  /* ---------- DataTable: full certificate records ---------- */
  if ($('#certTable').length) {
    const rows = CERTIFICATE_DATA.map((c) => [
      `<span class="mono">${c.id}</span>`,
      c.name,
      c.course,
      c.issueDate,
      `<span class="status-pill ${c.status === 'Valid' ? 'valid' : 'revoked'}">${c.status}</span>`,
      `<button class="btn btn-outline-pa btn-sm-pa view-cert-btn" data-id="${c.id}">
         <i class="bi bi-eye"></i> View
       </button>`
    ]);

    const table = $('#certTable').DataTable({
      data: rows,
      columns: [
        { title: 'Certificate ID' },
        { title: 'Student Name' },
        { title: 'Course' },
        { title: 'Issue Date' },
        { title: 'Status' },
        { title: 'Action', orderable: false }
      ],
      pageLength: 6,
      lengthChange: false,
      responsive: false,
      scrollX: true,
      language: {
        search: '',
        searchPlaceholder: 'Search records...',
        paginate: { previous: '‹', next: '›' }
      }
    });

    // Clicking "View" fills the verify form and scrolls up to the result
    $('#certTable tbody').on('click', '.view-cert-btn', function () {
      const id = $(this).data('id');
      $input.val(id);
      $form.trigger('submit');
      $('html, body').animate({ scrollTop: $('#verifySection').offset().top - 100 }, 500);
    });
  }

});
