import PropTypes from 'prop-types';

export default function Banner ({image, alt}){

    const style = {
        section: {
            position: 'relative',
            width: '100%',
            minHeight: '45vh', // minHeight au lieu de height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0',
        },
        bannerImg: {
            objectFit: 'contain',
            width: '95%',
            maxHeight: '45vh',
            borderRadius: '10px',
        },
    }

    return(
        <section style={style.section}>
            <img src={image} alt={alt} style={style.bannerImg}/>
        </section>
    )
}

Banner.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}