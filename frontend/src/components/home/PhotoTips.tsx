import { Check } from "lucide-react";

import SectionHeading from "../ui/SectionHeading";

interface Tip {
    title: string;
    description: string;
}

const TIPS: Tip[] = [
    {
        title: "Cahaya yang cukup",
        description:
            "Ambil foto di tempat terang dan hindari bayangan yang menutupi permukaan buah.",
    },
    {
        title: "Fokus pada satu buah",
        description:
            "Pastikan buah terlihat jelas dan memenuhi sebagian besar bingkai foto.",
    },
    {
        title: "Gambar tajam",
        description:
            "Tahan kamera dengan stabil agar foto tidak buram.",
    },
    {
        title: "Latar yang sederhana",
        description:
            "Hindari objek lain di sekitar buah agar hasil deteksi lebih akurat.",
    },
];

// Desainnya memakai .how-grid dan .step (landing.css), bagian 4. HOW IT WORKS
export default function PhotoTips() {
    return (
        <section className="section section-green-soft">
            <div className="container-wide">
                <div className="how-grid">
                    <SectionHeading
                        align="left"
                        badge="TIPS FOTO"
                        title="Foto yang baik, hasil lebih akurat"
                        description="Kualitas foto memengaruhi hasil deteksi. Ikuti beberapa tips berikut sebelum mengunggah gambar."
                    />

                    <ul className="steps">
                        {TIPS.map((tip) => (
                            <li key={tip.title} className="step">
                                <div className="step-number" aria-hidden="true">
                                    <Check className="icon-md" />
                                </div>

                                <div>
                                    <h3 className="step-title">{tip.title}</h3>
                                    <p className="step-desc">{tip.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}