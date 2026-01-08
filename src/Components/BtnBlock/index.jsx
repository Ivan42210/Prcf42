import PropTypes from 'prop-types';

export default function BtnBlock ({children}){

    const style = {
        section: {
            width: '100%', // Prend toute la largeur du parent
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '1em 0',
            gap: '1em', // Espacement entre les enfants si jamais ils se touchent
        }
    }

    return(
        <section style={style.section}>
            {children}
        </section>
    )
}

BtnBlock.propTypes = {
    children: PropTypes.node.isRequired
}