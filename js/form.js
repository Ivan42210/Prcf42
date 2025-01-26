const contactBtn = document.querySelector('.btn_form');
const contactForm = document.querySelector('.form_section');
const closeBtn = document.querySelector('.close_btn');
const sendBtn = document.getElementById('send_btn');
const informerRadio = document.getElementById('choice2');

// Automatically check the 's'informer' radio input
informerRadio.checked = true;

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const nameInput = document.querySelector('input[placeholder="Nom"]');
    const firstNameInput = document.querySelector('input[placeholder="Prénom"]');
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const messageInput = document.querySelector('textarea');

    if (!nameRegex.test(nameInput.value)) {
        alert('Veuillez entrer un nom valide.');
        return;
    }

    if (!nameRegex.test(firstNameInput.value)) {
        alert('Veuillez entrer un prénom valide.');
        return;
    }

    if (!emailRegex.test(emailInput.value)) {
        alert('Veuillez entrer un email valide.');
        return;
    }

    if (messageInput.value.trim() === '') {
        alert('Veuillez entrer un message.');
        return;
    }

    alert('Votre message a été envoyé.');
    contactForm.classList.add('hidden');
    contactForm.classList.remove('opened');
});

contactBtn.addEventListener('click', () => {
    contactForm.classList.remove('hidden');
    contactForm.classList.add('opened');
});

closeBtn.addEventListener('click', () => {
    const inputs = contactForm.querySelectorAll('input');
    const textarea = contactForm.querySelector('textarea');
    
    inputs.forEach(input => {
        if (input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    textarea.value = '';

    contactForm.classList.add('hidden');
    contactForm.classList.remove('opened');
});