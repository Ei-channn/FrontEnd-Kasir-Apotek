import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import api from "../services/api";
import "./Transaksi.css";

function Transaksi() {

    const [obat, setObat] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);
    const [bayar, setBayar] = useState("");

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

    const calculateTotal = (data) => {
        const sum = data.reduce((acc, item) => acc + (item.price * item.qty), 0);
        setTotal(sum);
    };

    const addItem = (item) => {

        const exist = cart.find(i => i.id === item.id);

        if (exist) {
            alert("Obat sudah ada di keranjang");
            return;
        }

        const newItem = {
            id: item.id,
            name: item.nama_obat,
            price: Number(item.harga),
            stock: Number(item.stok),
            qty: 1
        };

        const newCart = [...cart, newItem];

        setCart(newCart);
        calculateTotal(newCart);
    };

    const updateQty = (index, qty) => {

        const newCart = [...cart];
        newCart[index].qty = parseInt(qty);

        setCart(newCart);
        calculateTotal(newCart);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const detail = cart.map(item => ({
            obat_id: item.id,
            jumlah: item.qty
        }));

        try {
            await api.post("/transaksi", {
                bayar: bayar,
                detail: detail
            });

            alert("Transaksi berhasil");

            setCart([]);
            setTotal(0);
            setBayar("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="main-container">
                <Nav />
                <div className="container-main">
                    <Header title="Transaksi" />
                    <main>
                        <div className="container-search"
                            style={{
                                justifyContent: "start"
                            }}
                        >
                            <div className="search">
                                <input type="text" placeholder="Search by name..."/>
                            </div>
                        </div>
                        <div className="container-1">
                            <div className="sub-container-2">
                                <h3>Data Obat</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Obat</th>
                                            <th>Kode</th>
                                            <th>Kategori</th>
                                            <th>Harga</th>
                                            <th>Stok</th>
                                            <th>Expired</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(obat) && obat.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                onClick={() => addItem(item)}
                                                style={{ cursor: "pointer" }}
                                            >
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
                            <div className="sub-container-5">
                                <form onSubmit={handleSubmit}>
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
                                            {cart.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>

                                                    <td>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max={item.stock}
                                                            value={item.qty}
                                                            onChange={(e) => updateQty(index, e.target.value)}
                                                            style={{
                                                                border: "none",
                                                                fontSize: "medium"
                                                            }}
                                                        />
                                                    </td>

                                                    <td>{item.price * item.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <br />
                                    <p>Total : Rp {total}</p>
                                    <div className="input">

                                    <input
                                        type="number"
                                        placeholder="Bayar"
                                        value={bayar}
                                        onChange={(e) => setBayar(e.target.value)}
                                        /><hr />
                                        </div>
                                    <br />
                                    <button type="submit" className="bttn">Simpan Transaksi</button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Transaksi;