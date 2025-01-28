import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Form.css'; // Assurez-vous de créer un fichier CSS pour le style

export default function Form({ onClose }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: '',
        choice: 'informer'
    });

    const [errors, setErrors] = useState({});

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!nameRegex.test(formData.nom)) newErrors.nom = 'Veuillez entrer un nom valide.';
        if (!nameRegex.test(formData.prenom)) newErrors.prenom = 'Veuillez entrer un prénom valide.';
        if (!emailRegex.test(formData.email)) newErrors.email = 'Veuillez entrer un email valide.';
        if (formData.message.trim() === '') newErrors.message = 'Veuillez entrer un message.';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            alert('Votre message a été envoyé.');
            onClose();
        }
    };

    return (
        <section id="contact_form" className="form_section">
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                    {errors.nom && <p className="error">{errors.nom}</p>}
                    <input
                        type="text"
                        name="prenom"
                        placeholder="Prénom"
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                    {errors.prenom && <p className="error">{errors.prenom}</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <div className="choice_area">
                        <input
                            type="radio"
                            name="choice"
                            id="choice1"
                            value="adhérer"
                            checked={formData.choice === 'adhérer'}
                            onChange={handleChange}
                        />
                        <label htmlFor="choice1">Adhérer</label>
                        <input
                            type="radio"
                            name="choice"
                            id="choice2"
                            value="informer"
                            checked={formData.choice === 'informer'}
                            onChange={handleChange}
                        />
                        <label htmlFor="choice2">S'informer</label>
                    </div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && <p className="error">{errors.message}</p>}
                    <button type="submit" id="send_btn" className="send_btn">Envoyer</button>
                </div>
            </form>
            <FontAwesomeIcon icon={faXmark} className="close_btn" onClick={onClose} />
        </section>
    );
}

Form.propTypes = {
    onClose: PropTypes.func.isRequired
};