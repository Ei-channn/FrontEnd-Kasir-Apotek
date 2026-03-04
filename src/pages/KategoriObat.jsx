import { useEffect, useState } from "react";
import Header from "../components/Header"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import api from "../services/api"
import './KategoriObat.css'

function kategoriObat() {

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
                        <div className="container-a">
                            <div className="sub-container-a">

                            </div>
                            <div className="sub-container-b">
                                
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