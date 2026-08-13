import { useState } from "react";
import {
  AlertTriangle,
  Bug,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Leaf,
  Search,
  ShieldCheck,
} from "lucide-react";

interface Disease {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  shortDescription: string;
  description: string;
  symptoms: string[];
  cause: string;
  color: string;
  image: string;
}

const diseases: Disease[] = [
  {
    id: 1,
    name: "Busuk Buah",
    scientificName: "Phytophthora palmivora",
    category: "Penyakit",
    shortDescription:
      "Penyakit yang menyebabkan jaringan buah kakao membusuk dan berkembang menjadi bercak berwarna cokelat kehitaman.",
    description:
      "Busuk buah merupakan salah satu penyakit penting pada tanaman kakao. Penyakit ini dapat menyerang berbagai bagian buah dan menyebabkan kerusakan pada jaringan buah. Kondisi lembap dan lingkungan yang mendukung perkembangan patogen dapat mempercepat penyebaran penyakit.",
    symptoms: [
      "Muncul bercak berwarna cokelat pada permukaan buah.",
      "Bercak dapat berkembang dan meluas ke bagian buah lainnya.",
      "Jaringan buah mengalami pembusukan.",
      "Pada kondisi tertentu dapat terlihat lapisan atau pertumbuhan berwarna putih pada permukaan buah.",
    ],
    cause:
      "Disebabkan oleh patogen Phytophthora palmivora yang dapat berkembang dengan baik pada kondisi lingkungan yang lembap.",
    color: "emerald",
    image: "/images/penyakit/busuk-buah.jpg",
  },

  {
    id: 2,
    name: "Helopeltis",
    scientificName: "Helopeltis spp.",
    category: "Hama",
    shortDescription:
      "Hama yang menyerang bagian tanaman kakao dengan cara menusukkan alat mulutnya dan mengisap cairan tanaman.",
    description:
      "Helopeltis merupakan kelompok serangga hama yang dapat menyerang tanaman kakao. Serangan dapat ditemukan pada buah maupun bagian tanaman lainnya dan menimbulkan kerusakan pada jaringan tanaman.",
    symptoms: [
      "Muncul bercak atau luka pada permukaan buah.",
      "Terdapat bagian jaringan yang mengalami kerusakan akibat tusukan.",
      "Luka dapat berkembang menjadi bercak berwarna gelap.",
      "Serangan berat dapat mengganggu perkembangan buah.",
    ],
    cause:
      "Disebabkan oleh serangan serangga Helopeltis spp. yang menusukkan alat mulutnya ke jaringan tanaman untuk mengisap cairan.",
    color: "amber",
    image: "/images/penyakit/helopeltis.jpg",
  },

  {
    id: 3,
    name: "Penggerek Buah Kakao",
    scientificName: "Conopomorpha cramerella",
    category: "Hama",
    shortDescription:
      "Hama yang menyerang buah kakao melalui larva yang berkembang di dalam buah dan dapat mengganggu perkembangan biji.",
    description:
      "Penggerek buah kakao (PBK) merupakan salah satu hama penting pada tanaman kakao. Larva berkembang di dalam buah sehingga keberadaannya sering kali sulit diketahui hanya dengan melihat permukaan buah.",
    symptoms: [
      "Permukaan buah dapat menunjukkan perubahan warna atau gejala tidak normal.",
      "Buah dapat mengalami perubahan dalam proses pematangan.",
      "Biji kakao dapat menjadi lebih sulit dikeluarkan dari buah.",
      "Serangan dapat menyebabkan penurunan kualitas dan hasil biji kakao.",
    ],
    cause:
      "Disebabkan oleh serangan ngengat Conopomorpha cramerella. Larvanya berkembang di dalam buah dan memengaruhi jaringan serta perkembangan biji.",
    color: "red",
    image: "/images/penyakit/pbk.jpg",
  },
];

function TentangPenyakit() {
  const [selectedDisease, setSelectedDisease] =
    useState<Disease | null>(null);

  const [openAccordion, setOpenAccordion] =
    useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenAccordion((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-green-800">

        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-3xl">

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-700/50 px-4 py-2 text-sm text-green-100 backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-lime-300" />

              Informasi Penyakit Kakao
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Kenali Gangguan pada
              <span className="block text-lime-300">
                Buah Kakao
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-green-100 sm:text-lg">
              Kenali karakteristik dan gejala beberapa
              gangguan yang dapat menyerang buah kakao.
              Informasi ini dapat membantu memahami hasil
              deteksi pada aplikasi CocoaScan.
            </p>

          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">
                3
              </p>

              <p className="text-sm text-green-100">
                Jenis Gangguan
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">
                AI
              </p>

              <p className="text-sm text-green-100">
                Berbasis Computer Vision
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================================================= */}
      {/* DISEASE CARDS */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-10 max-w-2xl">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
            <Search className="h-4 w-4" />

            Gangguan yang Dapat Dideteksi
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Jenis Penyakit dan Hama
          </h2>

          <p className="mt-3 text-gray-600">
            CocoaScan menggunakan tiga kelas gangguan
            pada buah kakao dalam proses klasifikasinya.
          </p>

        </div>


        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {diseases.map((disease) => (

            <article
              key={disease.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">

                <img
                  src={disease.image}
                  alt={disease.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                      disease.category === "Penyakit"
                        ? "bg-emerald-100/90 text-emerald-800"
                        : "bg-amber-100/90 text-amber-800"
                    }`}
                  >
                    {disease.category === "Penyakit" ? (
                      <CircleAlert className="h-3.5 w-3.5" />
                    ) : (
                      <Bug className="h-3.5 w-3.5" />
                    )}

                    {disease.category}
                  </span>

                </div>

              </div>


              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-bold text-gray-900">
                  {disease.name}
                </h3>

                <p className="mt-1 text-sm italic text-green-700">
                  {disease.scientificName}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {disease.shortDescription}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDisease(disease)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Lihat Informasi

                  <Search className="h-4 w-4" />
                </button>

              </div>

            </article>

          ))}

        </div>
      </section>


      {/* ================================================= */}
      {/* ACCORDION INFORMATION */}
      {/* ================================================= */}

      <section className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
              <AlertTriangle className="h-5 w-5 text-green-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Kenali Gejalanya
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Beberapa karakteristik umum dari gangguan
              yang digunakan dalam klasifikasi.
            </p>

          </div>


          <div className="space-y-3">

            {diseases.map((disease) => {

              const isOpen =
                openAccordion === disease.id;

              return (
                <div
                  key={disease.id}
                  className="overflow-hidden rounded-2xl border border-gray-200"
                >

                  {/* Accordion button */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleAccordion(disease.id)
                    }
                    className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                        <Leaf className="h-4 w-4 text-green-700" />
                      </div>

                      <span className="font-semibold text-gray-900">
                        {disease.name}
                      </span>

                    </div>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}

                  </button>


                  {/* Accordion content */}
                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 pb-5 pt-4">

                      <p className="text-sm leading-6 text-gray-600">
                        {disease.description}
                      </p>

                      <div className="mt-5">

                        <h4 className="text-sm font-semibold text-gray-900">
                          Gejala yang dapat diamati
                        </h4>

                        <ul className="mt-3 space-y-2">

                          {disease.symptoms.map(
                            (symptom, index) => (
                              <li
                                key={index}
                                className="flex gap-3 text-sm text-gray-600"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />

                                <span>
                                  {symptom}
                                </span>
                              </li>
                            )
                          )}

                        </ul>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-green-800 px-6 py-10 sm:px-10">

          <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

            <div className="max-w-xl">

              <div className="flex items-center gap-2 text-sm font-medium text-lime-300">
                <ShieldCheck className="h-5 w-5" />

                Deteksi Berbasis AI
              </div>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Temukan kemungkinan penyakit pada buah kakao
              </h2>

              <p className="mt-3 text-sm leading-6 text-green-100">
                Gunakan fitur deteksi untuk menganalisis
                gambar buah kakao dan mendapatkan hasil
                klasifikasi dari model CocoaScan.
              </p>

            </div>

            <a
              href="/deteksi-penyakit"
              className="shrink-0 rounded-xl bg-lime-300 px-6 py-3 text-sm font-bold text-green-900 transition hover:bg-lime-200"
            >
              Mulai Deteksi
            </a>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MODAL DETAIL */}
      {/* ================================================= */}

      {selectedDisease && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedDisease(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal image */}
            <div className="relative h-56 overflow-hidden sm:h-64">

              <img
                src={selectedDisease.image}
                alt={selectedDisease.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setSelectedDisease(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
              >
                <XIcon />
              </button>

            </div>


            {/* Modal content */}
            <div className="p-6 sm:p-8">

              <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                {selectedDisease.category}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {selectedDisease.name}
              </h2>

              <p className="mt-1 text-sm italic text-green-700">
                {selectedDisease.scientificName}
              </p>


              <p className="mt-5 text-sm leading-7 text-gray-600">
                {selectedDisease.description}
              </p>


              {/* Symptoms */}
              <div className="mt-7">

                <h3 className="font-semibold text-gray-900">
                  Gejala yang dapat diamati
                </h3>

                <ul className="mt-3 space-y-2">

                  {selectedDisease.symptoms.map(
                    (symptom, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-gray-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />

                        {symptom}
                      </li>
                    )
                  )}

                </ul>

              </div>


              {/* Cause */}
              <div className="mt-7 rounded-2xl bg-gray-50 p-5">

                <h3 className="text-sm font-semibold text-gray-900">
                  Penyebab
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedDisease.cause}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================================================= */
/* CLOSE ICON */
/* ================================================= */

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default TentangPenyakit;