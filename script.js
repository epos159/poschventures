document.querySelector('.nav-dropdown-trigger').addEventListener('click', function (e) {
  e.stopPropagation();
  const dropdown = this.closest('.nav-dropdown');
  dropdown.classList.toggle('is-open');
  this.setAttribute('aria-expanded', dropdown.classList.contains('is-open'));
});

document.addEventListener('click', function () {
  document.querySelectorAll('.nav-dropdown.is-open').forEach(function (d) {
    d.classList.remove('is-open');
    d.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', 'false');
  });
});
