import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './Transaksi.css'

function Transaksi(){
    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="Transaksi" />
                    <main>
                        
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Transaksi;