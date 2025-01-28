import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Banner from "../../Components/Banner";
import BtnBlock from "../../Components/BtnBlock";
import image from '../../assets/bannière.png';
import logo from '../../assets/prcf42.png';
import icLogo from '../../assets/cropped-Logo-seul.png';
import jrcfLogo from '../../assets/jrcf-logo-768x768.png';
import {Link} from 'react-router-dom';  // import de Link pour les liens

export default function Home() {

    const style = {
        image:{
            width: '50px',
        }
    }

    return (
        <>
            <Banner image={image} alt={'bannière PRCF'} logo={logo} altLogo={'logo du PRCF 42'} />
              <main>
                <h3>Suivez-nous</h3>
                <BtnBlock>
                    <Link to='https://x.com/Prcf42'>
                        <FontAwesomeIcon icon={faXTwitter} size='3x' />
                    </Link>
                    <Link to='https://www.instagram.com/prcf42/'>
                        <FontAwesomeIcon icon={faInstagram} size='3x'/>
                    </Link>
                </BtnBlock>
                <h3>Infos</h3>
                <BtnBlock>
                    <Link to='https://www.initiative-communiste.fr/'>
                        <img src={icLogo} alt="" style={style.image}/>
                    </Link>
                    <Link to='https://jrcf.fr'>
                        <img src={jrcfLogo} alt="" style={style.image}/>
                    </Link>
                </BtnBlock>
            </main>
        </>
    );
}