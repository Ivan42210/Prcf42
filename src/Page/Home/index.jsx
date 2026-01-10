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
            background: 'transparent',
            padding: '10px',
            fontSize: '1.2em',
            borderRadius: '40px',
            borderStyle: 'none',
        }
    };

    return (
        <>
            <Banner image={image} alt={'bannière PRCF'} />
            <main>
                <div className='padding-corrector'>
                <div>
                    <h2 style={style.title}>Organisation Communiste de France - Saint-Etienne</h2>
                </div>
                <div>
                    <h3 style={style.subtitle}>Pour reconstruire un parti communiste</h3>
                </div>
                 <BtnBlock>
    <div>
        <button className='contact-btn color_red' style={style.contactBtn} onClick={toggleForm}>
            <FontAwesomeIcon icon={faEnvelope} size='3x' />
        </button>
    </div>
    <Link to='https://jeunessedumonde.fr/' className='btn-jdm'>
        <p className='text-btn-jdm'>Jeunesse du monde</p>
    </Link>
</BtnBlock>
<BtnBlock>
    <Link to='https://x.com/Ocf_Loire_42?s=20' className='color_red text-size'>
        <FontAwesomeIcon icon={faSquareXTwitter} size='3x' />
    </Link>
    <Link to='https://www.instagram.com/ocf.42?' className='color_red text-size'>
        <FontAwesomeIcon icon={faInstagram} size='3x'/>
    </Link>
    <Link to='https://www.tiktok.com/@.ocf42' className='color_red text-size'>
        <FontAwesomeIcon icon={faTiktok} size='3x' />
    </Link>
</BtnBlock>
                <div style={style.formBtnDiv}>
                  
                </div>
                <Form onClose={toggleForm} isVisible={isFormVisible} />
                </div>
            </main>
        </>
    );
}