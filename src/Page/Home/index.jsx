import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Banner from "../../Components/Banner";
import BtnBlock from "../../Components/BtnBlock";
import Form from "../../Components/Form";
import image from '../../assets/bannière.png';
import logo from '../../assets/prcf42.png';
import icLogo from '../../assets/cropped-Logo-seul.png';
import jrcfLogo from '../../assets/jrcf-logo-768x768.png';
import { Link } from 'react-router-dom';

export default function Home() {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    const style = {
        image: {
            width: '50px',
        },
        formBtnDiv: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2em',
        },
        contactBtn: {
            width: '50%',
            margin: '1em auto',
            fontWeight: '600',
            fontSize: '20px',
            background: 'transparent',
            boxShadow: '0 0 0 3px white',
            padding: '10px',
            borderRadius: '40px',
            borderStyle: 'none',
        }
    };

    return (
        <>
            <Banner image={image} alt={'bannière PRCF'} logo={logo} altLogo={'logo du PRCF 42'} />
            <main>
                <h3>Suivez-nous</h3>
                <BtnBlock>
                    <Link to='https://x.com/Prcf42'>
                        <FontAwesomeIcon icon={faTwitter} size='3x' />
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
                <div style={style.formBtnDiv}>
                    <button style={style.contactBtn} onClick={toggleForm}>Contact</button>
                </div>
                <Form onClose={toggleForm} isVisible={isFormVisible} />
            </main>
        </>
    );
}