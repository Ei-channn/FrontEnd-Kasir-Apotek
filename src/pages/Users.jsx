import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import api from "../services/api"

function Users() {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalData, setTotalData] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alamat, setAlamat] = useState("");
    const [role, setRole] = useState("admin");
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const resUsers = await api.get(`/users?page=${page}`);

            setUsers(resUsers.data.data.data);
            setLastPage(resUsers.data.data.last_page);
            setTotalData(resUsers.data.data.total);


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
                name: name,
                email: email,
                password: password,
                alamat: alamat,
                role: role
            };

            if (editId) {
                await api.put(`/users/${editId}`, data);
            } else {
                await api.post("/users", data);
            }
            
            setName("");
            setEmail("");
            setPassword("");
            setAlamat("");
            setRole("admin");
            setEditId(null);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setEmail(item.email);
        setPassword(item.password);
        setAlamat(item.alamat);
        setRole(item.role);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
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
                    <Header title="Users Management" />
                    <main>
                        <div className="container-search">
                            <div className="search">
                                <input type="text" placeholder="Search by name..."/>
                            </div>
                        </div>
                        <div className="main">
                            <div className="container-data">
                                <div className="container-1">
                                    <div className="sub-container-2">
                                        <h3>Users</h3>
                                        <div className="container-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>no</th>
                                                        <th>nama</th>
                                                        <th>email</th>
                                                        <th>alamat</th>
                                                        <th>role</th>
                                                        <th>aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(users) && users.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.alamat}</td>
                                                            <td>{item.role}</td>
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
                            </div>
                            <div className="container-2">
                                <div className="sub-container-5">
                                    <h2>{editId ? "Update" : "Tambah"} Data</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input">
                                            <input
                                                type="text"
                                                placeholder="Nama"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            /><hr />
                                        </div><br />
                                        <div className="input">
                                            <input
                                                type="email"
                                                placeholder="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            /><hr />
                                        </div><br />
                                        <div className="input">
                                            <input
                                                type="text"
                                                placeholder="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            /><hr />
                                        </div><br />
                                        <div className="input">
                                            <input
                                                type="text"
                                                placeholder="Alamat"
                                                value={alamat}
                                                onChange={(e) => setAlamat(e.target.value)}
                                            /><hr />
                                        </div><br />
                                        <div className="input">
                                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                                <option value="">Pilih Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="kasir">Kasir</option>
                                            </select>
                                        </div><br />
                                        <button type="submit" className="bttn">
                                            {editId ? "Update" : "Tambah"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Users;