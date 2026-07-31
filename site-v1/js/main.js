/* Glynloen Insurance Consulting — contact form handling
   Uses FormSubmit (https://formsubmit.co) so the static site can email
   submissions to info@glynloen.com with no backend. */
/* Stat counters — animate 0 → target when scrolled into view.
   Markup carries the final value ("66+") as a no-JS fallback. */
(function () {
  var nums = document.querySelectorAll('.stat .num[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      var target = parseInt(el.dataset.count, 10);
      var duration = 1400;
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + '+';
        if (p < 1) requestAnimationFrame(tick);
      }
      el.textContent = '0+';
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  nums.forEach(function (el) { observer.observe(el); });
})();

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
