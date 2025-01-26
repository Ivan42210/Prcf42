const contactBtn = document.querySelector('.btn_form');
const contactForm = document.querySelector('.form_section');
const closeBtn = document.querySelector('.close_btn');

console.log(contactBtn);

contactBtn.addEventListener('click', () => {
    contactForm.classList.remove('hidden');
    contactForm.classList.add('opened');
});

closeBtn.addEventListener('click', () => {
    contactForm.classList.add('hidden');
    contactForm.classList.remove('opened');
});