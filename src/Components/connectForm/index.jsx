import './ConnectForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../../Services/authServices";

export default function ConnectForm() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const { user, error } = await login(email, password);
        if (error) {
            setMessage(`Erreur: ${error.message}`);
        } else {
            setMessage(`Connexion réussie: ${user.email}`);
            navigate('/dashboard'); 
        }
    }

    return (
        <div>
            <h1>Connectez-vous</h1>
            <form onSubmit={handleSubmit} className='form_body'>
                <input type="text" placeholder="email" />
                <input type="password" placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}