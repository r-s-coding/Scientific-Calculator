document.addEventListener("DOMContentLoaded", function (event) {
  const btnGroup = document.querySelector('.btn-toggle');
  const toggleButtons = btnGroup.querySelectorAll('.btn');

  btnGroup.addEventListener('click', function () {
    toggleButtons.forEach(button => {
      button.classList.toggle('active');
    });

    // Sliding transition for the small screen
    const carousel = document.querySelector('.carousel');
    const slideIndex = document.querySelector('.btn-bd-toggleButton.active').textContent === '123' ? 0 : 1;
    carousel.setAttribute('data-bs-slide-to', slideIndex);
    carousel.dispatchEvent(new Event('slide.bs.carousel'));
    const bsCarousel = new bootstrap.Carousel(carousel);
    bsCarousel.to(slideIndex); // Trigger carousel slide transition
  });
});
