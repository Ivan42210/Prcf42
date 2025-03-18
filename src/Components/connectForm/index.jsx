import React from 'react'; // Ajoutez
import { login } from "../../Services/authServices";

export default function ConnectForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        login(email, password);
    }


    return (
        <div>
            <h1>Connectez-vous</h1>
            <form>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="Mot de passe"/>
                <button type="submit" onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    )
}