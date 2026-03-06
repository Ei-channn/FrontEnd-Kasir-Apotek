import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './History.css'

function History(){

    const [transaksi, setTransaksi] = useState([]);
    const [detail, setDetail] = useState([]);
    const [select, setSelect] = useState([]);

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

    const getDetail = async (item) => {
        try {
            const response = await api.get(`/transaksi/${item.id}`);
            
            const data = response.data.data;

            setSelect(data);
            setDetail(data.detail_transaksis)

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="History Transaksi" />
                    <main>
                        <div className="test"> 
                            <div className="container-data" 
                                style={{
                                    width: "65%"
                                }}
                            >
                                <div className="container-1">
                                    <div className="sub-container-1"
                                        style={{
                                            background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                            color: "white"
                                        }}    
                                    >
                                        <p>Total Mingguan</p>
                                        <h1>100000</h1>
                                    </div>
                                    <div className="sub-container-1">
                                        <p>Transaksi Mingguan</p>
                                        <h1>30</h1>
                                    </div>
                                </div>
                                <div className="container-1">
                                    <div className="sub-container-5">
                                        <h3>Data Transaksi</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>no</th>
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
                                                {Array.isArray(transaksi) && transaksi.map((item, index) => (
                                                    <tr key={item.id}
                                                        onClick={() => getDetail(item)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <td>{index + 1}</td>
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
                            </div>
                            <div className="container-2"
                                style={{
                                    width: "35%"
                                }}
                            >
                                <div className="sub-container-3"
                                    style={{
                                        height: "auto",
                                        maxHeight: "400px",
                                        overflowY: "auto"
                                    }}
                                >

                                    <h3>Detail Transaksi</h3><br />
                                    {select && (
                                        <div>
                                            <h4>No Transaksi : {select.no_transaksi}</h4>
                                            <p>bayar : {select.bayar}</p>
                                            <p>total : {select.total_harga}</p>
                                            <p>kembalian : {select.kembalian}</p>
                                        </div>
                                    )}

                                    <br />

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Harga</th>
                                                <th>Qty</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detail.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.obat?.nama_obat}</td>
                                                    <td>{item.obat?.harga}</td>
                                                    <td>{item.jumlah}</td>
                                                    <td>{item.obat?.harga * item.jumlah}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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