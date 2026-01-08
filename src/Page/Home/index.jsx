import  { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';  
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Banner from "../../Components/Banner";
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import BtnBlock from "../../Components/BtnBlock";
import Form from "../../Components/Form";
import image from '../../assets/banniere ok.png';

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
        title:{
            fontSize: '1.5em',
            fontWeight: '600',
            textAlign: 'center',
            color: '#CA2E2F'
        },
        subtitle : {
            fontSize: '1.3em',
            fontWeight: '400',
            textAlign: 'center',
            margin: '0'
        
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
            <Banner image={image} alt={'bannière PRCF'} />
            <main>
                <div>
                    <h2 style={style.title}>Organisation Communiste de France - Saint-Etienne</h2>
                </div>
                <div>
                    <h3 style={style.subtitle}>Pour reconstruire un parti communiste</h3>
                </div>
                <BtnBlock>
                    <Link to='https://x.com/Prcf42' className='color_red'>
                        <FontAwesomeIcon icon={faSquareXTwitter} size='3x' />
                    </Link>
                    <Link to='https://www.instagram.com/prcf42/'className='color_red'>
                        <FontAwesomeIcon icon={faInstagram} size='3x'/>
                    </Link>
                    <Link to='https://x.com/Prcf42' className='color_red'>
                        <FontAwesomeIcon icon={faTiktok} size='3x' />
                    </Link>
                </BtnBlock>
                <BtnBlock>
                    <Link to='https://www.initiative-communiste.fr/'>
                        <img src={icLogo} alt="" style={style.image}/>
                    </Link>
                    <Link to='https://jrcf.fr'>
                        <img src={jrcfLogo} alt="" style={style.image}/>
                    </Link>
                </BtnBlock>
                <div style={style.formBtnDiv}>
                    <button className='contact-btn color_red' style={style.contactBtn} onClick={toggleForm}>
                        <FontAwesomeIcon icon={faEnvelope} size='1x' />
                    </button>
                </div>
                <Form onClose={toggleForm} isVisible={isFormVisible} />
            </main>
        </>
    );
}