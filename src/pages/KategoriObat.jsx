import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './KategoriObat.css'

function kategoriObat() {

    const [kategori, setKategori] = useState([]);
    const [namaKategori, setNamaKategori] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get("/kategori");

            const paginated = response.data.data;

            setKategori(paginated.data);

        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {    
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/kategori/${editId}`, {
                    nama_kategori: namaKategori,
                });
            } else {
                await api.post("/kategori", {
                    nama_kategori: namaKategori,
                });
            }
            
            setNamaKategori("");
            setEditId(null);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setNamaKategori(item.nama_kategori);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/kategori/${id}`);
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
                    <Header title="Kategori Obat" />
                    <main>
                        <div className="container-search">
                            <div className="search">
                                <input type="text" placeholder="Search by name..."/>
                            </div>
                        </div>
                        <div className="test">
                            <div className="container-data">
                                <div className="container-1">
                                    <div className="sub-container-1" 
                                        style={{
                                            background: "linear-gradient(244deg, #222421 0%, #525252 100%)",
                                            color: "white"
                                        }}    
                                    >
                                        <div>
                                            <h3>Data Kategori Obat</h3><br />
                                            
                                        </div>
                                    </div>
                                    <div className="sub-container-1">
                                        <div>
                                            <h3>Data Kategori Obat</h3><br />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="container-1">
                                    <div className="sub-container-5">
                                        <h3>Kategori Obat</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>id</th>
                                                        <th>nama</th>
                                                        <th>jumlah obat</th>
                                                        <th>aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(kategori) && kategori.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama_kategori}</td>
                                                            <td>{item.obats_count}</td>
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
                            </div>
                            <div className="container-2">
                                <div className="sub-container-4">
                                    <h2>{editId ? "Update" : "Tambah"} Data</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input">
                                            <input
                                                type="text"
                                                placeholder="Nama kategori"
                                                value={namaKategori}
                                                onChange={(e) => setNamaKategori(e.target.value)}
                                            /><hr />
                                        </div><br />
                                        <button type="submit" className="bttn">
                                            {editId ? "Update" : "Tambah"}
                                        </button>
                                    </form>
                                </div>
                                <div className="sub-container-3">
                                    
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

export default kategoriObat;