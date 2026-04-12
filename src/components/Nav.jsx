import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function Nav(){

    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/getUser");

                const data = response.data;

                setUser(data);

            } catch (error) {
                console.log("Error fetch permintaan:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
        await api.post("/logout");

        localStorage.removeItem("token");

        navigate("/login");
        } catch (error) {
        console.log(error);
        }
    };

    console.log(user);

    return(
        <div className='container-nav'>
            <h1>Apotek</h1>
            <nav>
                <ul>
                    <Link to="/dashboard"><li>Dashboard</li></Link>
                    {user.role == 'admin' && (
                        <>
                            <Link to="/users"><li>Users</li></Link>
                            <Link to="/kategori"><li>Kategori Obat</li></Link>
                            <Link to="/obat"><li>Obat</li></Link>
                        </>
                    )}
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