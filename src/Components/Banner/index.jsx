
export default function Banner ({image, alt, logo, altLogo}){

    const style = {
        section: {
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            width: '100%',
            height: '40vh',
            background: 'black'
        },
        divLogo:{
            width: '50px',
            height: '50px',
            background: 'blue',
        }
    }

    return(
        <>
            <section style={style.section}>
                <img src={image} alt={alt} />
                <div style={style.divLogo}>
                    <img src={logo} alt={altLogo} />
                </div>
            </section>
        </>
    )
}