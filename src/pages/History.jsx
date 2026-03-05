import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './History.css'

function History(){

    const [transaksi, setTransaksi] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/transaksi");

                const paginated = response.data.data;

                setTransaksi(paginated.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="History Transaksi" />
                    <main>
                        <div className="container-1">
                            <div className="sub-container-5">
                                <h3>Data Transaksi</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>no transaksi</th>
                                            <th>kasir</th>
                                            <th>bayar</th>
                                            <th>total</th>
                                            <th>kembalian</th>
                                            <th>waktu</th>
                                            <th>tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(transaksi) && transaksi.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.no_transaksi}</td>
                                                <td>{item.user?.name}</td>
                                                <td>{item.bayar}</td>
                                                <td>{item.total_harga}</td>
                                                <td>{item.kembalian}</td>
                                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                <td>{new Date(item.created_at).toLocaleTimeString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History;