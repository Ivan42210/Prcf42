import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './Routing.css'


export default function Routing (){
    

    return(
        <>
        < Router>
            <Routes>
                <Route exact path={'/'}/>
            </Routes>
        </Router>
    </>
    )
}