import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './Routing.css'
import Home from '../Page/Home'


export default function Routing (){
    

    return(
        <>
        < Router>
            <Routes>
                <Route exact path={'/'} element={<Home/>}/>
            </Routes>
        </Router>
    </>
    )
}