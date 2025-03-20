const accordionButtons = document.querySelectorAll('.p-accordion__btn');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const accordionContent = document.getElementById(button.getAttribute('aria-controls'));
    const plusIcon = button.querySelector('.c-icon-plus--accordion');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      accordionContent.style.maxHeight = null;
      plusIcon.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
      accordionContent.setAttribute('aria-hidden', 'true');
    } else {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      plusIcon.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      accordionContent.setAttribute('aria-hidden', 'false');
    }
  });

  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.click();
    }
  });
});
