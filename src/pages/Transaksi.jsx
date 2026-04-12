import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import api from "../services/api";

function Transaksi() {

    const [obat, setObat] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);
    const [bayar, setBayar] = useState("");

    const fetchData = async () => {
        try {
            const response = await api.get(`/obat?page=${page}`);
            const paginated = response.data.data;
            setObat(paginated.data);
            setTotalData(paginated.total);
            setLastPage(paginated.last_page);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [page]);

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
                                <div className="container-table">
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
                                            {Array.isArray(obat) && obat.
                                                map((item, index) =>
                                                item.stok > 0 && (
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
                            <div className="sub-container-8">
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
            {/* <Footer /> */}
        </div>
    );
}

export default Transaksi;