import './Nav.css'

function Nav(){
    return(
        <div className='container-nav'>
            <h1>Apotek</h1>
            <nav>
                <ul>
                    <a href=""><li>Dashboard</li></a>
                    <a href=""><li>Kategori obat</li></a>
                    <a href=""><li>Obat</li></a>
                    <a href=""><li>Transaksi</li></a>
                    <a href=""><li>History</li></a>
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