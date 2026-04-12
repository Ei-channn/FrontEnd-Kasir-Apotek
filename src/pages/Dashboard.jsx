import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import api from "../services/api"
import { toRupiah } from "../utils/toRupiah";

function Dasboard() {

    console.log("TOKEN:", localStorage.getItem("token"));

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [obat, setObat] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [transaksi, setTransaksi] = useState([]);
    const [laporan, setLaporan] = useState([]);

    useEffect(() => {   
        const fetchData = async () => {
            try {
                const resObat = await api.get("/obat");
                const response = await api.get("/getUser");
                const resUsers = await api.get("/users");
                const resKategori = await api.get("/kategori");
                const resTransaksi = await api.get("/transaksi");
                const resLaporan = await api.get("/laporan");

                setObat(resObat.data.data.data);
                setUser(response.data);
                setUsers(resUsers.data.data.data);
                setKategori(resKategori.data.data.data);
                setTransaksi(resTransaksi.data.data.data);
                setLaporan(resLaporan.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // console.log(laporan);

    return (
        <div>
            <div className="main-container">
                <Nav />
                <div className="container-main">
                <Header title="Dashboard"/>
                    <main>
                        <div className="container-1">
                            <div className="sub-container-1"
                                style={{
                                    background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                    color: "white"
                                }}                                
                            >
                                <p>Pendapatan Harian</p>
                                <h1>{toRupiah(laporan.total_harian || 0)}</h1>
                            </div>
                            <div className="sub-container-1">
                                <p>Transaksi Harian</p>
                                <h1>{laporan.jumlah_transaksi_harian || 0}</h1>
                            </div>
                            <div className="sub-container-1"
                                style={{
                                    background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                    color: "white"
                                }}                                
                            >    
                                <p>Pendapatan Bulanan</p>
                                <h1>{toRupiah(laporan.total_bulanan || 0 )}</h1>
                            </div>
                            <div className="sub-container-1">
                                <p>Transaksi Bulanan</p>
                                <h1>{laporan.jumlah_transaksi_bulanan || 0}</h1>
                            </div>
                        </div>
                        {user.role === "admin" && (
                            <>
                                <div className="container-1">
                                    <div className="sub-container-7"></div>
                                    <div className="sub-container-3">
                                        <h3>Data Users</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>no</th>
                                                        <th>nama</th>
                                                        <th>email</th>
                                                        <th>role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(users) && users.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.role}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-1">
                                    <div className="sub-container-3">
                                        <h3>Kategori Obat</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>no</th>
                                                        <th>nama</th>
                                                        <th>jumlah obat</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(kategori) && kategori.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama_kategori}</td>
                                                            <td>{item.obats_count}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="sub-container-7">
                                        <h3>Data Obat</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>no</th>
                                                        <th>nama obat</th>
                                                        <th>kode obat</th>
                                                        <th>kategori</th>
                                                        <th>harga</th>
                                                        <th>stok</th>
                                                        <th>expired</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(obat) && obat.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
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
                                </div>
                            </>
                        )}
                        <div className="container-1">
                            <div className="sub-container-2">
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
            {/* <Footer /> */}
        </div>
    )
}

export default Dasboard;