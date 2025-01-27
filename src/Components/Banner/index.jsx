
export default function Banner ({image, alt, logo, altLogo}){

    const style = {
        section: {
            justifyContent: 'flex',
            width: '100%',
            height: '40vh',
            background: 'black'
        }
    }

    return(
        <>
            <section style={style.section}>
                <img src={image} alt={alt} />
                <div>
                    <img src={logo} alt={altLogo} />
                </div>
            </section>
        </>
    )
}