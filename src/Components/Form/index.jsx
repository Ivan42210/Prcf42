import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../env';
import './Form.css'; // Assurez-vous de créer un fichier CSS pour le style

export default function Form({ onClose, isVisible }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: '',
        choice: 'informer'
    });

    const [errors, setErrors] = useState({});
    const [isHidden, setIsHidden] = useState(!isVisible);

    useEffect(() => {
        if (isVisible) {
            setIsHidden(false);
        } else {
            const timer = setTimeout(() => setIsHidden(true), 500); // Correspond à la durée de l'animation
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch(`${API_URL}/api/send-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.prenom,
                        lastName: formData.nom,
                        email: formData.email,
                        subject: formData.choice, // Utiliser la valeur du bouton radio comme sujet
                        message: formData.message,
                    }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Votre message a été envoyé avec succès.');
                    onClose();
                } else {
                    alert(`Erreur: ${result.message}`);
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'email :', error);
                alert('Erreur lors de l\'envoi de l\'email.');
            }
        }
    };

    return (
        <section id="contact_form" className={`form_section ${!isVisible ? 'hidden' : ''}`} style={{ display: isHidden ? 'none' : 'flex' }}>
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
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};
