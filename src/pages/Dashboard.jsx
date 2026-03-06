import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './Dashboard.css'

function Dasboard() {

    console.log("TOKEN:", localStorage.getItem("token"));

    const [obat, setObat] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [transaksi, setTransaksi] = useState([]);
    const [laporan, setLaporan] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {   
        const fetchData = async () => {
            try {
                const response = await api.get("/obat");

                const paginated = response.data.data;

                setObat(paginated.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/kategori");

                const paginated = response.data.data;

                setKategori(paginated.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/laporan");

                setLaporan(response.data);

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
                <Header title="Dashboard"/>
                    <main>
                        {/* <div className="container-box">
                            <button onClick={() => setActive(!active)} className={active ? "btn-active" : "btn"}>test</button>
                            <button className="btn"></button>
                            <button className="btn"></button>
                            <button className="btn"></button>
                            <div className="sub-container-box-2"></div>
                        </div> */}
                        <div className="container-1">
                            <div className="sub-container-1"
                                style={{
                                    background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                    color: "white"
                                }}                                
                            >
                                <p>Total Harian</p>
                                <h1>{laporan.total_harian}</h1>
                            </div>
                            <div className="sub-container-1">
                                <p>Transaksi Harian</p>
                                <h1>{laporan.jumlah_transaksi_harian}</h1>
                            </div>
                            <div className="sub-container-1"
                                style={{
                                    background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                    color: "white"
                                }}                                
                            >    
                                <p>Total Bulanan</p>
                                <h1>{laporan.total_bulanan}</h1>
                            </div>
                            <div className="sub-container-1">
                                <p>Transaksi Bulanan</p>
                                <h1>{laporan.jumlah_transaksi_bulanan}</h1>
                            </div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-2"></div>
                            <div className="sub-container-3"></div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-3">
                                <h3>Kategori Obat</h3>
                                <div className="container-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>nama</th>
                                                <th>jumlah obat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(kategori) && kategori.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nama_kategori}</td>
                                                    <td>{item.obats_count}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="sub-container-2">
                                <h3>Data Obat</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>nama obat</th>
                                            <th>kode obat</th>
                                            <th>kategori</th>
                                            <th>harga</th>
                                            <th>stok</th>
                                            <th>expired</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(obat) && obat.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.nama_obat}</td>
                                                <td>{item.kode_obat}</td>
                                                <td>{item.kategori_obat?.nama_kategori}</td>
                                                <td>{item.harga}</td>
                                                <td>{item.stok}</td>
                                                <td>{item.tanggal_kadaluarsa}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-3">
                                <h3>Data Transaksi</h3>
                                <div className="container-table">
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
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dasboard;