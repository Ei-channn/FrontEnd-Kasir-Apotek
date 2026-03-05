import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './Obat.css'

function Obat(){

    const [obat, setObat] = useState([]);
    const [kategori, setKategori] = useState([]);

    const [namaObat, setNamaObat] = useState([""]);
    const [kodeObat, setKodeObat] = useState([""]);
    const [kategoriId, setKategoriId] = useState("");
    const [harga, setHarga] = useState([""]);
    const [stok, setStok] = useState([""]);
    const [expired, setExpired] = useState([""]);
    const [editId, setEditId] = useState([""]);

    const fetchData = async () => {
        try {
            const response = await api.get("/obat");

            const paginated = response.data.data;

            setObat(paginated.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchKategori = async () => {
            const response = await api.get("/kategori");

            const paginated = response.data.data;

            setKategori(paginated.data);
        };

        fetchKategori();
    }, []);

    useEffect(() => {   
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nama_obat: namaObat,
                kode_obat: kodeObat,
                kategori_obat_id: kategoriId,
                harga: harga,
                stok: stok,
                tanggal_kadaluarsa: expired,
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
            setExpired("");
            setEditId(null);
            fetchData();
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
        setExpired(item.tanggal_kadaluarsa);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/obat/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

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
                            <div className="sub-container-6"></div>
                            <div className="sub-container-7">
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
                                                            value={expired}
                                                            onChange={(e) => setExpired(e.target.value)}
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
                                            <th>aksi</th>
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
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Obat;