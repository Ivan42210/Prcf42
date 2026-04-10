import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './Routing.css'
import Home from '../Page/Home'
import LoginPage from '../Page/LoginPage'
import DashboardPage from '../Page/DashboardPage'


export default function Routing (){
    

    return(
        <>
        < Router>
            <Routes>
                <Route exact path={'/'} element={<Home/>}/>
                 <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> 
            </Routes>
        </Router>
    </>
    )
}