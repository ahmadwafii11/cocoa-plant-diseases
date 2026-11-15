import { APP_NAV_LINKS, ROUTES } from "../constants/site";

import { useDetection } from "../hooks/useDetection";

import ClassesSection from "../components/detection/ClassesSection";
import DetectHero from "../components/detection/DetectHero";
import StatusCard from "../components/detection/StatusCard";
import UploadCard from "../components/detection/UploadCard";
import HowItWorks from "../components/landing/HowItWorks";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserActions from "../components/layout/UserActions";

// Desain terdapat di src/styles/detection.css
// Logika terdapat di src/hooks/useDetection.ts
export default function DeteksiPenyakit() {
  const {file, previewUrl, detecting, error, selectFile, reset, detect } = useDetection();

  return(
    <>
      <div className="page">
        <Navbar
          links={APP_NAV_LINKS}
          homeTo={ROUTES.home}
          actions={<UserActions />}
        />

        <main className="page-main">
          <DetectHero />

          <section className="container-wide detect-area">
            <div className="detect-grid">
              <div className="detect-col-main">
                <UploadCard
                  file={file}
                  previewUrl={previewUrl}
                  detecting={detecting}
                  error={error}
                  onSelect={selectFile}
                  onReset={reset}
                  onDetect={detect}
                />
              </div>

              <div className="detect-col-side">
                <StatusCard detecting={detecting} />
              </div>
            </div>
          </section>

          <HowItWorks />
          <ClassesSection />
        </main>

        <Footer />
      </div>
    </>
  )
}