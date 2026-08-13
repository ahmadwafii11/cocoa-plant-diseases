import { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  ScanSearch,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bug,
  Leaf,
  Info,
  Loader2,
} from "lucide-react";

type DiseaseType =
  | "Busuk Buah"
  | "Helopeltis"
  | "Penggerek Buah Kakao";

interface DetectionResult {
  disease: DiseaseType;
  confidence: number;
  description: string;
  category: "Penyakit" | "Hama";
}

const diseaseInfo: Record<
  DiseaseType,
  {
    description: string;
    category: "Penyakit" | "Hama";
  }
> = {
  "Busuk Buah": {
    category: "Penyakit",
    description:
      "Hasil menunjukkan karakteristik yang menyerupai gejala busuk buah pada buah kakao.",
  },

  Helopeltis: {
    category: "Hama",
    description:
      "Hasil menunjukkan karakteristik yang menyerupai kerusakan akibat serangan Helopeltis.",
  },

  "Penggerek Buah Kakao": {
    category: "Hama",
    description:
      "Hasil menunjukkan karakteristik yang menyerupai gejala serangan Penggerek Buah Kakao (PBK).",
  },
};

function DeteksiPenyakit() {
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [isDetecting, setIsDetecting] =
    useState(false);

  const [result, setResult] =
    useState<DetectionResult | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);


  /* ================================================= */
  /* HANDLE IMAGE */
  /* ================================================= */

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");
      return;
    }

    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);

    // Reset hasil deteksi ketika gambar baru dipilih
    setResult(null);
  };


  /* ================================================= */
  /* DETECTION */
  /* ================================================= */

  const handleDetection = async () => {
    if (!imageFile) {
      alert("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    setIsDetecting(true);
    setResult(null);

    /*
     * =================================================
     * SEMENTARA: SIMULASI HASIL MODEL
     * =================================================
     *
     * Nantinya bagian ini dapat diganti dengan:
     *
     * const formData = new FormData();
     * formData.append("image", imageFile);
     *
     * const response = await fetch(
     *   "http://localhost:8000/predict",
     *   {
     *     method: "POST",
     *     body: formData,
     *   }
     * );
     *
     * const data = await response.json();
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );

    const diseases: DiseaseType[] = [
      "Busuk Buah",
      "Helopeltis",
      "Penggerek Buah Kakao",
    ];

    const randomDisease =
      diseases[Math.floor(Math.random() * diseases.length)];

    const confidence =
      Math.floor(
        (85 + Math.random() * 13) * 10
      ) / 10;

    setResult({
      disease: randomDisease,
      confidence,
      description:
        diseaseInfo[randomDisease].description,
      category:
        diseaseInfo[randomDisease].category,
    });

    setIsDetecting(false);
  };


  /* ================================================= */
  /* RESET */
  /* ================================================= */

  const handleReset = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  /* ================================================= */
  /* OPEN FILE */
  /* ================================================= */

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };


  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-green-800">

        {/* Background decoration */}

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-700/50 px-4 py-2 text-sm text-green-100 backdrop-blur-sm">

              <ScanSearch className="h-4 w-4 text-lime-300" />

              AI Disease Detection

            </div>


            {/* Heading */}

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">

              Deteksi Penyakit

              <span className="block text-lime-300">
                Buah Kakao
              </span>

            </h1>


            {/* Description */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-green-100 sm:text-lg">

              Unggah gambar buah kakao dan biarkan
              CocoaScan membantu mengidentifikasi
              kemungkinan gangguan berdasarkan citra
              menggunakan model kecerdasan buatan.

            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* DETECTION AREA */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-5">


          {/* ================================================= */}
          {/* LEFT - UPLOAD */}
          {/* ================================================= */}

          <div className="lg:col-span-3">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              {/* Heading */}

              <div className="mb-6">

                <div className="flex items-center gap-2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">

                    <ImageIcon className="h-5 w-5 text-green-700" />

                  </div>

                  <div>

                    <h2 className="font-bold text-gray-900">
                      Upload Gambar
                    </h2>

                    <p className="text-sm text-gray-500">
                      Pilih gambar buah kakao
                    </p>

                  </div>

                </div>

              </div>


              {/* Upload Box */}

              {!selectedImage ? (

                <button
                  type="button"
                  onClick={openFilePicker}
                  className="group flex min-h-[380px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 transition hover:border-green-500 hover:bg-green-50/50"
                >

                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 transition group-hover:scale-105">

                    <Upload className="h-9 w-9 text-green-700" />

                  </div>


                  <h3 className="mt-6 text-lg font-semibold text-gray-900">

                    Upload gambar buah kakao

                  </h3>


                  <p className="mt-2 text-center text-sm text-gray-500">

                    Klik untuk memilih gambar dari perangkat Anda

                  </p>


                  <span className="mt-5 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-green-800">

                    Pilih Gambar

                  </span>


                  <p className="mt-4 text-xs text-gray-400">

                    JPG, JPEG, atau PNG • Maksimal 10 MB

                  </p>

                </button>

              ) : (

                /* ================================================= */
                /* IMAGE PREVIEW */
                /* ================================================= */

                <div className="relative overflow-hidden rounded-2xl bg-gray-100">

                  <div className="relative flex min-h-[380px] items-center justify-center">

                    <img
                      src={selectedImage}
                      alt="Preview buah kakao"
                      className="max-h-[500px] w-full object-contain"
                    />

                  </div>


                  {/* Image information */}

                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100">

                        <ImageIcon className="h-4 w-4 text-green-700" />

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-medium text-gray-900">

                          {imageFile?.name}

                        </p>

                        <p className="text-xs text-gray-500">

                          {imageFile
                            ? `${(
                                imageFile.size /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : ""}

                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >

                      <RotateCcw className="h-4 w-4" />

                      Ganti

                    </button>

                  </div>

                </div>

              )}


              {/* Hidden input */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />


              {/* Detect button */}

              <button
                type="button"
                onClick={handleDetection}
                disabled={!imageFile || isDetecting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >

                {isDetecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />

                    Sedang Menganalisis...

                  </>
                ) : (
                  <>
                    <ScanSearch className="h-5 w-5" />

                    Deteksi Penyakit

                  </>
                )}

              </button>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT - RESULT */}
          {/* ================================================= */}

          <div className="lg:col-span-2">

            <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              {/* Result heading */}

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">

                  <ScanSearch className="h-5 w-5 text-green-700" />

                </div>

                <div>

                  <h2 className="font-bold text-gray-900">
                    Hasil Deteksi
                  </h2>

                  <p className="text-sm text-gray-500">
                    Hasil klasifikasi gambar
                  </p>

                </div>

              </div>


              {/* ================================================= */}
              {/* NO RESULT */}
              {/* ================================================= */}

              {!result && !isDetecting && (

                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">

                    <ScanSearch className="h-9 w-9 text-gray-400" />

                  </div>

                  <h3 className="mt-6 font-semibold text-gray-900">

                    Belum Ada Hasil

                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">

                    Upload gambar buah kakao terlebih
                    dahulu kemudian tekan tombol
                    "Deteksi Penyakit".

                  </p>

                </div>

              )}


              {/* ================================================= */}
              {/* LOADING */}
              {/* ================================================= */}

              {isDetecting && (

                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                    <Loader2 className="h-9 w-9 animate-spin text-green-700" />

                  </div>

                  <h3 className="mt-6 font-semibold text-gray-900">

                    Menganalisis Gambar...

                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">

                    Model AI sedang menganalisis
                    karakteristik pada citra buah kakao.

                  </p>

                </div>

              )}


              {/* ================================================= */}
              {/* RESULT */}
              {/* ================================================= */}

              {result && !isDetecting && (

                <div className="mt-8">

                  {/* Success */}

                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">

                    <CheckCircle2 className="h-5 w-5" />

                    Deteksi berhasil dilakukan

                  </div>


                  {/* Disease name */}

                  <div className="mt-6 rounded-2xl bg-green-50 p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">

                      Kemungkinan terdeteksi

                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-green-900">

                      {result.disease}

                    </h3>

                    <div className="mt-3 flex items-center gap-2">

                      {result.category === "Penyakit" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Bug className="h-4 w-4 text-amber-600" />
                      )}

                      <span className="text-sm text-gray-600">

                        Kategori: {result.category}

                      </span>

                    </div>

                  </div>


                  {/* Confidence */}

                  <div className="mt-6">

                    <div className="flex items-center justify-between">

                      <span className="text-sm font-semibold text-gray-700">

                        Tingkat Keyakinan

                      </span>

                      <span className="text-lg font-bold text-green-700">

                        {result.confidence}%

                      </span>

                    </div>


                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-green-600 transition-all duration-1000"
                        style={{
                          width: `${result.confidence}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* Description */}

                  <div className="mt-6 rounded-2xl border border-gray-200 p-5">

                    <div className="flex items-start gap-3">

                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

                      <p className="text-sm leading-6 text-gray-600">

                        {result.description}

                      </p>

                    </div>

                  </div>


                  {/* Reset */}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >

                    <RotateCcw className="h-4 w-4" />

                    Deteksi Gambar Lain

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-semibold text-green-700">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">

              Bagaimana CocoaScan Bekerja?

            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">

              Proses deteksi dilakukan melalui beberapa
              tahapan untuk menghasilkan klasifikasi
              berdasarkan citra buah kakao.

            </p>

          </div>


          {/* Steps */}

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {/* Step 1 */}

            <div className="relative rounded-2xl bg-gray-50 p-6 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">

                01

              </div>

              <h3 className="mt-4 font-semibold text-gray-900">

                Upload Gambar

              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">

                Pilih gambar buah kakao yang ingin
                dianalisis dari perangkat Anda.

              </p>

            </div>


            {/* Step 2 */}

            <div className="relative rounded-2xl bg-gray-50 p-6 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">

                02

              </div>

              <h3 className="mt-4 font-semibold text-gray-900">

                Analisis AI

              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">

                Model ResNet50-CBAM menganalisis
                karakteristik visual pada gambar.

              </p>

            </div>


            {/* Step 3 */}

            <div className="relative rounded-2xl bg-gray-50 p-6 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">

                03

              </div>

              <h3 className="mt-4 font-semibold text-gray-900">

                Hasil Deteksi

              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">

                Sistem menampilkan kelas hasil
                klasifikasi beserta tingkat keyakinannya.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* SUPPORTED CLASSES */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-green-800 p-8 sm:p-10">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="flex items-center gap-2 text-sm font-medium text-lime-300">

                <Leaf className="h-4 w-4" />

                Kelas Klasifikasi

              </div>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">

                Gangguan yang Dapat Dideteksi

              </h2>

              <p className="mt-4 text-sm leading-6 text-green-100">

                Model klasifikasi pada CocoaScan
                digunakan untuk mengenali tiga jenis
                gangguan pada buah kakao.

              </p>

            </div>


            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">

              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">

                  <AlertTriangle className="h-4 w-4 text-lime-300" />

                </div>

                <span className="text-sm font-medium text-white">

                  Busuk Buah

                </span>

              </div>


              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">

                  <Bug className="h-4 w-4 text-lime-300" />

                </div>

                <span className="text-sm font-medium text-white">

                  Helopeltis

                </span>

              </div>


              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">

                  <Bug className="h-4 w-4 text-lime-300" />

                </div>

                <span className="text-sm font-medium text-white">

                  Penggerek Buah Kakao (PBK)

                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default DeteksiPenyakit;