import { BookOpen, History, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ROUTES } from "../../constants/site";

import SectionHeading from "../ui/SectionHeading";

import QuickActionCard from "./QuickActionCard";

interface QuickAction {
    to: string;
    icon: LucideIcon;
    title: string;
    description: string;
    cta: string;
}

const ACTIONS: QuickAction[] = [
    {
        to: ROUTES.detect,
        icon: ScanSearch,
        title: "Deteksi Penyakit",
        description:
            "Unggah foto buah kakao dan dapatkan hasil klasifikasinya.",
        cta: "Mulai deteksi",
    },
    {
        to: ROUTES.history,
        icon: History,
        title: "Riwayat Deteksi",
        description:
            "Lihat kembali hasil deteksi yang pernah Anda lakukan.",
        cta: "Lihat riwayat",
    },
    {
        to: ROUTES.disease,
        icon: BookOpen,
        title: "Informasi Penyakit",
        description:
            "Pelajari gejala, penanganan, dan pencegahan penyakit kakao.",
        cta: "Pelajari",
    },
];

// Desainnya ada di: landing.css (.feature-grid) dan section.css
export default function QuickActions() {
    return (
        <section className="section section-white">
            <div className="container-wide">
                <SectionHeading
                    badge="MENU UTAMA"
                    title="Apa yang ingin Anda lakukan?"
                    description="Pilih salah satu menu di bawah untuk mulai menggunakan CocoaScan."
                />

                <div className="feature-grid">
                    {ACTIONS.map((action) => (
                        <QuickActionCard key={action.to} {...action} />
                    ))}
                </div>
            </div>
        </section>
    );
}
