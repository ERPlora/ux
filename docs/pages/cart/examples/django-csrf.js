// En tu template base, agregar el token CSRF a todas las peticiones HTMX
document.body.addEventListener('htmx:configRequest', function(evt) {
  evt.detail.headers['X-CSRFToken'] = '{{ csrf_token }}';
});
