import { Leaf } from "lucide-react";

import { CLASS_COUNT } from "../../constants/site";
import { DISEASE_CLASSES } from "../../constants/detection";

// Desainnya terdapat di src/styles/detection.css (bagian 6. KELAS)
// Daftar empat kelas yang dapat dikenali model
export default function ClassesSection() {
    return (
        <section className="container-wide classes-wrap">
            <div className="classes-box">
                <div>
                    <p className="classes-eyebrow">
                        <Leaf className="icon-sm" aria-hidden="true" />
                        Kelas Klasifikasi
                    </p>

                    <h2 className="classes-title">Kelas yang Dapat Dideteksi</h2>

                    <p className="classes-desc">
                        Model klasifikasi pada CocoaScan digunakan untuk mengenali{" "}
                        {CLASS_COUNT} kelas kondisi pada buah kakao.
                    </p>
                </div>

                <ul className="classes-list">
                    {DISEASE_CLASSES.map(({ name, category, icon: Icon }) => (
                        <li key={name} className="class-item">
                            <span className="class-item-icon">
                                <Icon className="icon-md" aria-hidden="true" />
                            </span>

                            <span className="class-item-name">{name}</span>
                            <span className="class-item-tag">{category}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}