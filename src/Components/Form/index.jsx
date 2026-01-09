import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './Form.css';

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
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        if (isVisible) {
            setIsHidden(false);
        } else {
            const timer = setTimeout(() => {
                setIsHidden(true);
                resetForm();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const resetForm = () => {
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            message: '',
            choice: 'informer'
        });
        setErrors({});
        setSubmitStatus(null);
        setLoading(false);
    };

    const nameRegex = /^[a-zA-Z\sàáâäãåèéêëìíîïòóôöõøùúûüýÿçñ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Effacer l'erreur quand l'utilisateur corrige
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nom.trim() || !nameRegex.test(formData.nom)) {
            newErrors.nom = 'Veuillez entrer un nom valide.';
        }
        if (!formData.prenom.trim() || !nameRegex.test(formData.prenom)) {
            newErrors.prenom = 'Veuillez entrer un prénom valide.';
        }
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Veuillez entrer un email valide.';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Veuillez entrer un message.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setSubmitStatus(null);

        try {
            // Appeler la Netlify Function
            const response = await fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.prenom,
                    lastName: formData.nom,
                    email: formData.email,
                    subject: formData.choice,
                    message: formData.message,
                }),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: '✅ Message envoyé avec succès !'
                });
                
                // Réinitialiser le formulaire après succès
                setTimeout(() => {
                    setFormData({
                        nom: '',
                        prenom: '',
                        email: '',
                        message: '',
                        choice: 'informer'
                    });
                }, 1000);
                
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: `❌ ${result.error || 'Erreur lors de l\'envoi'}`
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            setSubmitStatus({
                type: 'error',
                message: '❌ Erreur de connexion'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact_form" className={`form_section color_white ${!isVisible ? 'hidden' : ''}`} style={{ display: isHidden ? 'none' : 'flex' }}>
            <div className="form_container">
                {submitStatus && (
                    <div className={`form_status ${submitStatus.type === 'success' ? 'form_status_success' : 'form_status_error'}`}>
                        <p>{submitStatus.message}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="form_group">
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={formData.nom}
                                onChange={handleChange}
                                disabled={loading}
                                className={errors.nom ? 'input_error' : ''}
                            />
                            {errors.nom && <p className="error">{errors.nom}</p>}
                        </div>
                        
                        <div className="form_group">
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom"
                                value={formData.prenom}
                                onChange={handleChange}
                                disabled={loading}
                                className={errors.prenom ? 'input_error' : ''}
                            />
                            {errors.prenom && <p className="error">{errors.prenom}</p>}
                        </div>
                        
                        <div className="form_group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                className={errors.email ? 'input_error' : ''}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        
                        <div className="choice_area">
                            <div className="radio_option">
                                <input
                                    type="radio"
                                    name="choice"
                                    id="choice1"
                                    value="adhérer"
                                    checked={formData.choice === 'adhérer'}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <label htmlFor="choice1">Adhérer</label>
                            </div>
                            <div className="radio_option">
                                <input
                                    type="radio"
                                    name="choice"
                                    id="choice2"
                                    value="informer"
                                    checked={formData.choice === 'informer'}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <label htmlFor="choice2">S'informer</label>
                            </div>
                        </div>
                        
                        <div className="form_group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={loading}
                                className={errors.message ? 'input_error' : ''}
                            />
                            {errors.message && <p className="error">{errors.message}</p>}
                        </div>
                        
                        <button 
                            type="submit" 
                            id="send_btn" 
                            className="send_btn color_white"
                            disabled={loading}
                        >
                            {loading ? 'Envoi en cours...' : 'Envoyer'}
                        </button>
                    </div>
                </form>
            </div>
            
            <FontAwesomeIcon 
                icon={faXmark} 
                className="close_btn" 
                onClick={loading ? undefined : onClose}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            />
        </section>
    );
}

Form.propTypes = {
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};