import './DashboardPage.css';
import Dashboard from "../../Components/Dashboard";
import DashboardNavbar from '../../Components/DashboardNavbar';
import { Route, Routes } from 'react-router-dom';
import ContactTable from '../../Components/ContactTable';


export default function DashboardPage() {
    return (
        <div className="dashboard_body">
            <DashboardNavbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/contacts" element={<ContactTable />}/>
            </Routes>
        </div>
    )
}