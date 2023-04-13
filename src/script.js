document.addEventListener("DOMContentLoaded", function (event) {
    const btnGroup = document.querySelector('.btn-toggle');
    const toggleButtons = btnGroup.querySelectorAll('.btn');
  
    btnGroup.addEventListener('click', function() {
      toggleButtons.forEach(button => {
        button.classList.toggle('active');
      });
    });
});
