import './DashboardPage.css';
import Dashboard from "../../Components/Dashboard";
import DashboardNavbar from '../../Components/DashboardNavbar';



export default function DashboardPage() {



    return (
        <div className="dashboard_body">
            <DashboardNavbar />
            <Dashboard />
        </div>
    )
}