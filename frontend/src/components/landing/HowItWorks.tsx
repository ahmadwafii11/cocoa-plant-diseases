import { MODEL_NAME } from "../../constants/site";
import SectionHeading from "../ui/SectionHeading";

// Desainnya ada di: src/styles/landing.css (bagian 4. HOW IT WORKS)
interface Step {
    title: string;
    description: string;
}

const STEPS: Step[] = [
    {
        title: "Upload gambar",
        description: "Pilih gambar buah kakao yang ingin diperiksa.",
    },
    {
        title: "Analisis dengan AI",
        description: `Sistem memproses gambar menggunakan model ${MODEL_NAME}.`,
    },
    {
        title: "Lihat hasil deteksi",
        description:
            "Hasil klasifikasi dan informasi prediksi ditampilkan kepada pengguna.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="cara-kerja"
            className="section section-green-soft section-anchor"
        >
            <div className="container-wide">
                <div className="how-grid">
                    <SectionHeading
                        align="left"
                        badge="CARA KERJA"
                        title="Deteksi dalam beberapa langkah sederhana"
                        description="Proses deteksi dirancang agar pengguna dapat melakukan klasifikasi citra buah kakao dengan alur yang sederhana."
                    />

                    <ol className="steps">
                        {STEPS.map((step, index) => (
                            <li key={step.title} className="step">
                                <div className="step-number" aria-hidden="true">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-desc">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};