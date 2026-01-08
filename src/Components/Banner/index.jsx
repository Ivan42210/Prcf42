
import PropTypes from 'prop-types';

export default function Banner ({image, alt}){

    const style = {
        section: {
            position: 'relative',
            width: '100%',
            height: '45vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        bannerImg: {
            objectFit: 'cover',
            width: '95%',
            overflow: 'hidden',
        },
    }

    return(
        <>
            <section style={style.section}>
                <img src={image} alt={alt}  style={style.bannerImg}/>
              
            </section>
        </>
    )
}

Banner.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}