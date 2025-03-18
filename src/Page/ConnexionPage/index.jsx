import './ConnexionPage.css';
import ConnectForm from '../../Components/connectForm';


export default function ConnexionPage() {
    return(
        <section className="connexion_body">
            <h2>Bonjour camarade</h2>

            <section>
                <ConnectForm/>
            </section>
        </section>
    )
}