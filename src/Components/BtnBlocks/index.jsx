export default function BtnBlock ({children}){

    const style = {
        display: 'flex',
        margin: '1em',
        justifyContent: 'space-between'
    }

    return(
        <>
            <section style={style}>
                {children}
            </section>
        </>
    )
}