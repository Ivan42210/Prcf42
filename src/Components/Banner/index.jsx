
export default function Banner ({image, alt, logo, altLogo}){

    const style = {
        section: {
            position: 'relative',
            width: '100%',
        },
        bannerImg: {
            objectFit: 'cover',
            height: '45vh',
            width: '100%',
            overflow: 'hidden',
        },
        divLogo:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        logoStyle: {
            width: '70px',
        }

    }

    return(
        <>
            <section style={style.section}>
                <img src={image} alt={alt}  style={style.bannerImg}/>
                <div style={style.divLogo}>
                    <img src={logo} alt={altLogo} style={style.logoStyle}/>
                </div>
            </section>
        </>
    )
}


/*
   display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            width: '100%',
            height: '40vh',
            background: 'black' 
 */