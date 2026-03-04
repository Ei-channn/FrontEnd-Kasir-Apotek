import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './Obat.css'

function Obat(){
    return (
        <div>
            <div className="main-container">
            <Nav />
                <div className="container-main">
                    <Header title="Obat" />
                    <main>
                        
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Obat;