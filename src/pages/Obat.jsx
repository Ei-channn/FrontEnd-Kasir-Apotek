import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import api from "../services/api"
import { toRupiah } from "../utils/toRupiah";

function Obat(){

    const [obat, setObat] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [expired, setExpired] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [countObat, setCountObat] = useState("");

    const [namaObat, setNamaObat] = useState([""]);
    const [kodeObat, setKodeObat] = useState([""]);
    const [kategoriId, setKategoriId] = useState("");
    const [harga, setHarga] = useState([""]);
    const [stok, setStok] = useState([""]);
    const [expiredDate, setExpiredDate] = useState([""]);
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const resObat = await api.get(`/obat?page=${page}`);
            const resKategori = await api.get("/kategori");
            const resCount = await api.get("/countObat");
            const resgetDateObat = await api.get("/getDateObat");
        
            setObat(resObat.data.data.data);
            setKategori(resKategori.data.data.data);
            setCountObat(resCount.data.data);
            setExpired(resgetDateObat.data.data);
            setLastPage(resObat.data.data.last_page);
            setTotalData(resObat.data.data.total);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {   
        fetchData();
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nama_obat: namaObat,
                kode_obat: kodeObat,
                kategori_obat_id: kategoriId,
                harga: harga,
                stok: stok,
                tanggal_kadaluarsa: expiredDate,
            };

            if (editId) {
                await api.put(`/obat/${editId}`, data);
            } else {
                await api.post("/obat", data);
            }
            
            setNamaObat("");
            setKodeObat("");
            setKategoriId("");
            setHarga("");
            setStok("");
            setExpiredDate("");
            setEditId(null);
            fetchData();
            fetchCount();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaObat(item.nama_obat);
        setKodeObat(item.kode_obat);
        setKategoriId(item.kategori_obat_id);
        setHarga(item.harga);
        setStok(item.stok);
        setExpiredDate(item.tanggal_kadaluarsa);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/obat/${id}`);
            fetchData();
            fetchCount();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(countObat);

    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="Obat" />
                    <main>
                        <div className="container-search">
                            <div className="search">
                                <input type="text" placeholder="Search by name, code or kategory..."/>
                            </div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-5">
                                <h3>Total Data Obat </h3><br /><br />
                                <h2>{countObat}</h2><br /><hr /><br />
                                <h3>Obat Mendekati Expired</h3>
                                <div className="container-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>no</th>
                                                <th>nama obat</th>
                                                <th>kode obat</th>
                                                <th>expired</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(expired) && expired.length > 0 ? (
                                                expired.map((item, index) => (
                                                <tr key={item.id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama_obat}</td>
                                                    <td>{item.kode_obat}</td>
                                                    <td>{item.tanggal_kadaluarsa}</td>
                                                </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                                        Tidak ada data obat yang akan expired dalam waktu dekat.
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="sub-container-2">
                                <h2>{editId ? "Update" : "Tambah"} Data</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-container">
                                            <div className="input-container-left">
                                                <div className="container-input">
                                                    <label htmlFor="">Nama Obat</label>
                                                    <div className="input">
                                                        <input
                                                            type="text"
                                                            placeholder="Nama Obat"
                                                            value={namaObat}
                                                            onChange={(e) => setNamaObat(e.target.value)}
                                                        /><hr />
                                                    </div>
                                                </div>
                                                <div className="container-input">
                                                    <label htmlFor="">Harga</label>
                                                    <div className="input">
                                                        <input
                                                            type="text"
                                                            placeholder="Ex : 15000"
                                                            value={harga}
                                                            onChange={(e) => setHarga(e.target.value)}
                                                        /><hr />
                                                    </div>
                                                </div>
                                                <div className="container-input">
                                                    <label htmlFor="">Stok</label>
                                                    <div className="input">
                                                        <input
                                                            type="number"
                                                            placeholder="Stok"
                                                            value={stok}
                                                            onChange={(e) => setStok(e.target.value)}
                                                        /><hr />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-container-right">
                                                <div className="container-input">
                                                    <label htmlFor="">Kode Obat</label>
                                                    <div className="input">
                                                        <input
                                                            type="text"
                                                            placeholder="Kode Obat"
                                                            value={kodeObat}
                                                            onChange={(e) => setKodeObat(e.target.value)}
                                                        /><hr />
                                                    </div>
                                                </div>
                                                <div className="container-input">
                                                    <label htmlFor="">Kategori</label>
                                                    <div className="input">
                                                        <select
                                                            value={kategoriId}
                                                            onChange={(e) => setKategoriId(e.target.value)}
                                                            >
                                                            <option value="">Pilih Kategori</option>

                                                            {kategori.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.nama_kategori}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div className="container-input">
                                                    <label htmlFor="">Expired Date</label>
                                                    <div className="input">
                                                        <input
                                                            type="date"
                                                            placeholder="Expired Date"
                                                            value={expiredDate}
                                                            onChange={(e) => setExpiredDate(e.target.value)}
                                                        /><hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="bttn">
                                            {editId ? "Update" : "Tambah"}
                                        </button>
                                    </form>
                            </div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-2">
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
                                                <th>aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(obat) && obat.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama_obat}</td>
                                                    <td>{item.kode_obat}</td>
                                                    <td>{item.kategori_obat?.nama_kategori}</td>
                                                    <td>{toRupiah(item.harga)}</td>
                                                    <td>{item.stok}</td>
                                                    <td>{item.tanggal_kadaluarsa}</td>
                                                    <td className="btttn">
                                                        <button className="btn-edit" onClick={() => handleEdit(item)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn-delete"onClick={() => handleDelete(item.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
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
                    </main>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Obat;