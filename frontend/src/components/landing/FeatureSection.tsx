import { BrainCircuit, History, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { APP_NAME } from "../../constants/site";
import SectionHeading from "../ui/SectionHeading";
import FeatureCard from "./FeatureCard";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FEATURES: Feature[] = [
    {
        icon: ScanSearch,
        title: "Deteksi Penyakit",
        description:
            "Unggah gambar buah kakao untuk mendapatkan hasil klasifikasi penyakit menggunakan model deep learning.",
    },
    {
        icon: BrainCircuit,
        title: "Analisis Berbasis AI",
        description:
            "Sistem menggunakan arsitektur ResNet50 dengan Convolutional Block Attention Module (CBAM) untuk melakukan klasifikasi citra.",
    },
    {
        icon: History,
        title: "Riwayat Deteksi",
        description:
            "Hasil deteksi dapat tersimpan sehingga pengguna dapat melihat kembali riwayat klasifikasi yang pernah dilakukan.",
    },
];

export default function FeatureSection() {
    return (
        <section id="fitur" className="section section-white section-anchor">
            <div className="container-wide">
                <SectionHeading
                    badge={`FITUR ${APP_NAME.toUpperCase()}`}
                    title="Membantu proses deteksi penyakit kakao"
                    description={`${APP_NAME} dirancang untuk memberikan pengalaman deteksi yang sederhana, informatif, dan mudah digunakan.`}
                />

                <div className="feature-grid">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};