import { useNavigate } from "react-router-dom";
import api from "../services/api"
import './Nav.css'
import { Link } from "react-router-dom";

function Nav(){

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await api.post("/logout");

        localStorage.removeItem("token");

        navigate("/login");
        } catch (error) {
        console.log(error);
        }
    };

    return(
        <div className='container-nav'>
            <h1>Apotek</h1>
            <nav>
                <ul>
                    <Link to="/dashboard"><li>Dashboard</li></Link>
                    <Link to="/kategori"><li>Kategori Obat</li></Link>
                    <Link to="/obat"><li>Obat</li></Link>
                    <Link to="/transaksi"><li>Transaksi</li></Link>
                    <Link to="/history"><li>History</li></Link>
                </ul>
                <ul className='p'>
                    <a href=""><li>Setting</li></a>
                    <li className="logout"><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;