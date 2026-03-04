import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './History.css'

function History(){
    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="History Transaksi" />
                    <main>
                        
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History;