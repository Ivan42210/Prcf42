
export default function Banner ({image, alt, logo, altLogo}){

    return(
        <>
            <section>
                <img src={image} alt={alt} />
                <div>
                    <img src={logo} alt={altLogo} />
                </div>
            </section>
        </>
    )
}