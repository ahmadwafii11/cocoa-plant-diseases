import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import {
    TERMS_INTRO,
    TERMS_LAST_UPDATED,
    TERMS_SECTIONS,
    TERMS_VERSION,
} from "../constants/terms";

// Desainnya ada di: src/styles/terms.css (bagian HALAMAN)
export default function TermsConditions() {
    return (
        <div className="page">
            <Navbar />

            <main className="page-main">
                <div className="container-narrow terms-wrap">
                    <article className="terms-card">
                        <h1 className="terms-title">Syarat dan Ketentuan</h1>

                        <p className="terms-meta">
                            Versi {TERMS_VERSION} &middot; Terakhir diperbarui{" "}
                            {TERMS_LAST_UPDATED}
                        </p>

                        <p className="terms-intro">{TERMS_INTRO}</p>

                        {TERMS_SECTIONS.map((section, index) => (
                            <section key={section.id} id={section.id} className="terms-section">
                                <h2 className="terms-heading">
                                    {index + 1}. {section.title}
                                </h2>

                                {section.paragraphs?.map((text) => (
                                    <p key={text} className="terms-text">
                                        {text}
                                    </p>
                                ))}

                                {section.items && (
                                    <ul className="terms-list">
                                        {section.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
};