import { useParams } from "react-router-dom";

import { APP_NAV_LINKS, ROUTES } from "../constants/site";

import { useDetectionResult } from "../hooks/useDetectionResult";

import UserActions from "../components/layout/UserActions";
import DetectionInfo from "../components/result/DetectionInfo";
import GradcamCard from "../components/result/GradcamCard";
import InputImageCard from "../components/result/InputImageCard";
import PredictionCard from "../components/result/PredictionCard";
import ResultError from "../components/result/ResultError";
import ResultHeader from "../components/result/ResultHeader";
import ResultLoading from "../components/result/ResultLoading";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Desain terdapat di src/styles/result.css (dan card.css)
// Pengambilan data terdapat di src/hooks/useDetectionResult.ts
export default function HasilDeteksi() {
    const { id } = useParams<{ id: string }>();
    const { result, loading, error } = useDetectionResult(id);

    return(
        <>
            <div className="page">
                <Navbar 
                    links={APP_NAV_LINKS}
                    homeTo={ROUTES.home}
                    actions={<UserActions />}
                />
                <main className="page-main">
                    {loading && <ResultLoading />}

                    {!loading && (error || !result) && <ResultError message={error} />}

                    {!loading && result && (
                        <div className="container-wide result-main">
                            <ResultHeader />

                            <div className="result-grid">
                                <InputImageCard result={result} />
                                <PredictionCard result={result} />
                            </div>

                            <GradcamCard result={result} />
                            <DetectionInfo result={result} />
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    )
}