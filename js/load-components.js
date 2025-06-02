document.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch('../templates/header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    });

  // Load footer
  fetch('../templates/footer.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    });
});