import PropTypes from 'prop-types';

export default function BtnBlock ({children}){

    const style = {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em auto',
    }

    return(
        <>
            <section style={style}>
                {children}
            </section>
        </>
    )
}

BtnBlock.propTypes = {
    children: PropTypes.node.isRequired
}

