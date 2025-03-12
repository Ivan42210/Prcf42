import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './Routing.css'
import Home from '../Page/Home'
import ConnexionPage from '../Page/ConnexionPage'


export default function Routing (){
    

    return(
        <>
        < Router>
            <Routes>
                <Route exact path={'/'} element={<Home/>}/>
                <Route path={'/connect'} element={<ConnexionPage/>}/>
            </Routes>
        </Router>
    </>
    )
}