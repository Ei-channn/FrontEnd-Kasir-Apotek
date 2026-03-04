import './Nav.css'
import { Link } from "react-router-dom";

function Nav(){
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
                    <li><button type='submit'>Logout</button></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;