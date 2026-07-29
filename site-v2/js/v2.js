/* GIC v2 shared: reveal-on-scroll, footer year, contact form (FormSubmit AJAX) */
(function () {
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    var rv = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rv').forEach(function (el) { rv.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  var form = document.getElementById('contactForm');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
    var payload = {};
    new FormData(form).forEach(function (v, k) { payload[k] = v; });
    fetch('https://formsubmit.co/ajax/info@glynloen.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function () { form.reset(); show('Thank you — your message has been sent. We’ll be in touch shortly.', true); })
      .catch(function () { show('Sorry, something went wrong. Please email info@glynloen.com directly.', false); })
      .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send Message'; } });
  });
  function show(msg, ok) {
    if (!status) { alert(msg); return; }
    status.hidden = false;
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }
})();
