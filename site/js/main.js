/* Glynloen Insurance Consulting — contact form handling
   Uses FormSubmit (https://formsubmit.co) so the static site can email
   submissions to info@glynloen.com with no backend. */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var btn = form.querySelector('button[type="submit"]');
  var ENDPOINT = 'https://formsubmit.co/ajax/info@glynloen.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }

    var payload = {};
    new FormData(form).forEach(function (v, k) { payload[k] = v; });

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function () {
        form.reset();
        show('Thank you — your message has been sent. We’ll be in touch shortly.', true);
      })
      .catch(function () {
        show('Sorry, something went wrong. Please email info@glynloen.com directly.', false);
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send Message'; }
      });
  });

  function show(msg, ok) {
    if (!status) { alert(msg); return; }
    status.hidden = false;
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }
})();
