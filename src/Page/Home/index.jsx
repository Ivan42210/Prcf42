
import Banner from "../../Components/Banner";
import image from '../../assets/bannière.png';
import logo from '../../assets/prcf42.png';


export default function Home (){


    return(
        <>
            <Banner image={image} alt={'bannière PRCF'} logo={logo} altLogo={'logo du PRCF 42'}/>
        </>
    )
}