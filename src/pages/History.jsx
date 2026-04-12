import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import api from "../services/api";
import { toRupiah } from "../utils/toRupiah";

function History() {

    const [transaksi, setTransaksi] = useState([]);
    const [detail, setDetail] = useState([]);
    const [select, setSelect] = useState(null);
    const [laporan, setLaporan] = useState({});
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/transaksi?page=${page}`);

                const data = response.data.data;

                setTransaksi(data.data);
                setTotalData(data.total);
                setLastPage(data.last_page);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        const fetchLaporan = async () => {
            try {
                const response = await api.get("/laporan");
                setLaporan(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLaporan();
    }, []);

    const getDetail = async (item) => {
        try {
            const response = await api.get(`/transaksi/${item.id}`);
            const data = response.data.data;

            setSelect(data);
            setDetail(data.detail_transaksis);

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
                        <div className="main">
                            <div className="container-data" style={{ width: "65%" }}>
                                <div className="container-1">
                                    <div className="sub-container-1"
                                        style={{
                                            background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                            color: "white"
                                        }}>
                                        <p>Pendapatan Bulanan</p>
                                        <h1>{toRupiah(laporan.total_bulanan || 0)}</h1>
                                    </div>
                                    <div className="sub-container-1">
                                        <p>Transaksi Bulanan</p>
                                        <h1>{laporan.jumlah_transaksi_bulanan || 0}</h1>
                                    </div>
                                </div>
                                <div className="container-1">
                                    <div className="sub-container-2">
                                        <h3>Data Transaksi</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Kasir</th>
                                                        <th>Bayar</th>
                                                        <th>Total</th>
                                                        <th>Kembalian</th>
                                                        <th>Tanggal</th>
                                                        <th>Waktu</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transaksi.map((item) => (
                                                        <tr
                                                            key={item.id}
                                                            onClick={() => getDetail(item)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <td>{item.no_transaksi}</td>
                                                            <td>{item.user?.name}</td>
                                                            <td>{toRupiah(item.bayar)}</td>
                                                            <td>{toRupiah(item.total_harga)}</td>
                                                            <td>{toRupiah(item.kembalian)}</td>
                                                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                            <td>{new Date(item.created_at).toLocaleTimeString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {totalData > 10 && (
                                    <div style={{ marginTop: "10px" }}>
                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(page - 1)}
                                        >
                                            Prev
                                        </button>
                                        {[...Array(lastPage)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                style={{
                                                    fontWeight: page === i + 1 ? "bold" : "normal",
                                                    margin: "0 3px"
                                                }}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={page === lastPage}
                                            onClick={() => setPage(page + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="container-2" style={{ width: "40%" }}>
                                <div className="sub-container-5"
                                    style={{
                                        maxHeight: "400px",
                                        overflowY: "auto"
                                    }}
                                >
                                    <h3>Detail Transaksi</h3><br />
                                    {select && (
                                        <div>
                                            <h4>No Transaksi : {select.no_transaksi}</h4>
                                            <p>Bayar : {toRupiah(select.bayar)}</p>
                                            <p>Total : {toRupiah(select.total_harga)}</p>
                                            <p>Kembalian : {toRupiah(select.kembalian)}</p>
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
                                                    <td>{toRupiah(item.obat?.harga)}</td>
                                                    <td>{item.jumlah}</td>
                                                    <td>{toRupiah(item.obat?.harga * item.jumlah)}</td>
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
        </div>
    );
}

export default History;