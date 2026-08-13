import { Link } from "react-router-dom";

import imageBackground from "../assets/background-beranda.jpg";

function Beranda() {
    return (
        <div
            className="relative h-screen w-full bg-cover bg-center"
            style={{
                backgroundImage: `url(${imageBackground})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/40 via-[60%]to-white" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                
                <h1 className="font-outfit text-5xl font-bold md:text-7xl">
                    CocoaScan
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-gray-200 md:text-xl hover:text-lime-300">
                    Smart Cocoa Disease Detection
                </p>

                <Link to="/deteksi-penyakit"
                      className="mt-8 rounded-2xl bg-lime-300 px-6 py-3 font-medium text-white transition hover:bg-lime-500"
                >
                    <span>Mulai Deteksi</span>
                </Link>
            </div>
        </div>
    )
}

export default Beranda