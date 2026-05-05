import { useState } from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    const [collapsed, setCollapsed] = useState(false)
    
    return (
        <>
            {/*Menu Navbar*/}
            <nav className="hidden md:block">
                <ul className="flex gap-6 items-center">
                    <li>
                        <NavLink to="/home"
                        >
                            <span className="hover: text-green-500">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tentangsistem"
                        >
                            <span className="hover: text-green-500">Tentang Sistem</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/deteksipenyakit"
                        >
                            <span className="hover: text-green-500">Deteksi Penyakit</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/artikel"
                        >
                            <span className="hover: text-green-500">Artikel</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/kontak"
                        >
                            <span className="hover: text-green-500">Kontak</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar