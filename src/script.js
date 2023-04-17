document.addEventListener("DOMContentLoaded", function (event) {
  // Controls which layout is displayed for the mobile screen
  const switchBtnGroup = document.querySelector('.switch');
  const switchToggleButtons = switchBtnGroup.querySelectorAll('.btn');
  // Switches which layout is active by clicking on the button
  switchBtnGroup.addEventListener('click', () => {
    switchToggleButtons.forEach(button => {
      button.classList.toggle('active');
    });
    // Sliding transition for the small screen using Boostrap carousel
    const carousel = document.querySelector('.carousel');
    const slideIndex = document.querySelector('.btn-bd-toggleButton.active').textContent === '123' ? 0 : 1;
    const bsCarousel = new bootstrap.Carousel(carousel);
    carousel.setAttribute('data-bs-slide-to', slideIndex);
    carousel.dispatchEvent(new Event('slide.bs.carousel'));
    // Trigger carousel slide transition
    bsCarousel.to(slideIndex);
  });

  // Keep track of the active state of the radDeg buttons
  let radDegActive = true;
  const radDegBtnGroups = document.querySelectorAll('.radDeg');
  radDegBtnGroups.forEach(radDegBtnGroup => {
    const radDegToggleButtons = radDegBtnGroup.querySelectorAll('.btn');
    radDegBtnGroup.addEventListener('click', () => {
      // Toggle the active state of the buttons
      radDegToggleButtons.forEach(button => {
        button.classList.toggle('active');
      });
      // Update the active state variable
      radDegActive = radDegToggleButtons[0].classList.contains('active');
      // Update the active state of the buttons in both instances
      radDegBtnGroups.forEach(group => {
        const buttons = group.querySelectorAll('.btn');
        buttons.forEach(button => {
          if (button.textContent === 'Rad') {
            button.classList.toggle('active', radDegActive);
          } else {
            button.classList.toggle('active', !radDegActive);
          }
        });
      });
    });
  });

  // Displaying the text content of the clicked button on screen
  //Getting the reference for the input field and the numeric and scientific buttons
  const inputField = document.getElementById('inputBox');
  const numericButtons = document.querySelectorAll('.numeric-buttons button');
  const scientificButtons = document.querySelectorAll('.scientific-buttons button');
  // Click event listener for the numeric buttons
  numericButtons.forEach(button => {
    button.addEventListener('click', () => {
      inputField.value += button.textContent;
    });
  });
  // Click event listener for the scientific buttons
  scientificButtons.forEach(button => {
    button.addEventListener('click', () => {
      inputField.value += button.textContent;
    });
  });
  // Click event listener for the CE button
  const ceButtons = document.querySelectorAll('.btn-ce');
  ceButtons.forEach(button => {
    button.addEventListener('click', () => {
      inputField.value = "";
    });
  });
});
