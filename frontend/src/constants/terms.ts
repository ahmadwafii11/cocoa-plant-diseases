/**
 * Isi Syarat dan Ketentuan CocoaScan.
 *
 * Semua teks ada di file ini supaya mudah diedit tanpa menyentuh tampilan.
 * Halaman src/pages/TermsConditions.tsx hanya membaca dan menampilkannya.
 *
 * Setiap kali isi berubah secara berarti:
 *   1. naikkan TERMS_VERSION
 *   2. perbarui TERMS_LAST_UPDATED
 */

export const TERMS_VERSION = "1.0";
export const TERMS_LAST_UPDATED = "30 Oktober 2026";

// TODO: ganti dengan email kontak yang benar-benar aktif.
export const TERMS_CONTACT_EMAIL = "wafifahmad@gmail.com";

export interface TermsSection {
    id: string;
    title: string;
    /** Paragraf pembuka section (opsional). */
    paragraphs?: string[];
    /** Daftar butir (opsional), tampil setelah paragraf. */
    items?: string[];
}

export const TERMS_INTRO =
    "Harap baca Syarat dan Ketentuan ini dengan saksama sebelum membuat akun dan menggunakan CocoaScan. Dengan mencentang kotak persetujuan saat melakukan registrasi akun, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh isinya.";

export const TERMS_SECTIONS: TermsSection[] = [
    {
        id: "pendahuluan",
        title: "Pendahuluan",
        paragraphs: [
            "CocoaScan merupakan aplikasi web yang dapat membantu dalam mengidentifikasi kondisi buah kakao melalui sebuah gambar dengan menggunakan teknologi kecerdasan buatan. Syarat dan Ketentuan ini mengatur penggunaan layanan tersebut oleh Anda sebagai pengguna.",
            "Jika Anda tidak menyetujui Syarat dan Ketentuan ini, mohon tidak membuat akun maupun menggunakan layanan CocoaScan.",
        ],
    },
    {
        id: "definisi",
        title: "Definisi",
        items: [
            "\"Layanan\" merupakan seluruh fitur CocoaScan, termasuk deteksi penyakit, riwayat deteksi, dan informasi penyakit.",
            "\"Pengguna\" atau \"Anda\" merupakan orang yang membuat akun dan menggunakan Layanan.",
            "\"Hasil Deteksi\" merupakan keluaran sistem berupa kelas hasil klasifikasi, nilai keyakinan (confidence), probabilitas tiap kelas, dan visualisasi Grad-CAM.",
        ],
    },
    {
        id: "akun",
        title: "Akun Pengguna",
        paragraphs: [
            "Untuk menggunakan fitur deteksi, Anda perlu membuat akun dengan memberikan username, nama lengkap, alamat email, dan kata sandi. Anda juga dapat menambahkan foto profil.",
        ],
        items: [
            "Anda wajib memberikan data yang benar dan memperbaruinya apabila terdapat perubahan.",
            "Username dan alamat email harus unik; satu alamat email hanya dapat dipakai untuk satu akun.",
            "Anda bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas yang terjadi melalui akun Anda.",
            "Segera hubungi kami bila Anda menduga akun Anda digunakan tanpa izin.",
        ],
    },
    {
        id: "penggunaan",
        title: "Penggunaan Layanan",
        paragraphs: [
            "Layanan disediakan untuk membantu mengenali kondisi buah kakao. Anda setuju menggunakan Layanan dengan itikad baik dan sesuai hukum yang berlaku.",
            "Anda tidak diperkenankan untuk:",
        ],
        items: [
            "Mengunggah gambar yang melanggar hukum, mengandung konten tidak pantas, atau melanggar hak pihak lain;",
            "Mengunggah file berbahaya, termasuk file yang berisi virus atau kode berbahaya;",
            "Mencoba mengakses akun, data, atau sistem milik pihak lain tanpa izin;",
            "Mengganggu atau membebani sistem, termasuk pengiriman permintaan secara berlebihan dan otomatis;",
            "Melakukan rekayasa balik (reverse engineering) terhadap model atau sistem CocoaScan.",
        ],
    },
    {
        id: "hasil-deteksi",
        title: "Sifat Hasil Deteksi",
        paragraphs: [
            "Hasil Deteksi yang dihasilkan oleh model kecerdasan buatan (ResNet50 dengan CBAM) adalah melakukan klasifikasi gambar ke dalam empat kelas: Busuk Buah, Helopeltis, Penggerek Buah Kakao, dan Kakao Sehat.",
            "Harap dipahami bahwa:",
        ],
        items: [
            "Hasil Deteksi merupakan perkiraan dan dapat keliru, terutama bila gambar buram, gelap, terpotong, atau menampilkan kondisi di luar keempat kelas tersebut.",
            "Nilai keyakinan (confidence) menunjukkan tingkat keyakinan model, bukan jaminan bahwa hasilnya benar.",
            "Visualisasi Grad-CAM hanya membantu menunjukkan area gambar yang memengaruhi prediksi dan bukan bukti diagnosis.",
            "Hasil Deteksi dan informasi penyakit di CocoaScan bukan pengganti pemeriksaan atau saran dari penyuluh pertanian, petugas perlindungan tanaman, atau ahli di bidangnya.",
            "Keputusan yang Anda ambil berdasarkan Hasil Deteksi, seperti tindakan penanganan di kebun, menjadi tanggung jawab Anda.",
        ],
    },
    {
        id: "data",
        title: "Data dan Privasi",
        paragraphs: [
            "Untuk menjalankan Layanan, CocoaScan mengumpulkan dan menyimpan data berikut:",
        ],
        items: [
            "Data akun: username, nama lengkap, alamat email, kata sandi (disimpan dalam bentuk terenkripsi/hash), dan foto profil apabila Anda menambahkannya;",
            "Data deteksi: gambar yang Anda unggah, nama file asli, Hasil Deteksi, gambar Grad-CAM, versi model yang digunakan, serta waktu deteksi.",
            "Data tersebut digunakan untuk menjalankan fitur Layanan, yaitu autentikasi akun, menampilkan Hasil Deteksi, dan menyimpan riwayat deteksi Anda.",
            "Kami berupaya menjaga keamanan data Anda, namun tidak ada sistem yang sepenuhnya bebas dari risiko.",
        ],
    },
    {
        id: "riwayat",
        title: "Riwayat dan Penghapusan Data",
        items: [
            "Setiap deteksi yang berhasil disimpan dalam riwayat akun Anda, dan hanya dapat dilihat oleh akun Anda.",
            "Anda dapat menghapus riwayat deteksi Anda kapan saja melalui fitur yang tersedia.",
            "Bila akun Anda dihapus, seluruh riwayat deteksi yang terkait dengan akun tersebut ikut terhapus dan tidak dapat dipulihkan.",
        ],
    },
    {
        id: "hak-cipta",
        title: "Hak Kekayaan Intelektual",
        items: [
            "Nama, logo, desain, kode, dan model CocoaScan dilindungi hak kekayaan intelektual dan tidak boleh disalin atau digunakan tanpa izin.",
            "Gambar yang Anda unggah tetap menjadi milik Anda. Anda memberi CocoaScan izin terbatas untuk memproses dan menyimpan gambar tersebut semata-mata untuk menjalankan Layanan bagi Anda.",
        ],
    },
    {
        id: "tanggung-jawab",
        title: "Batasan Tanggung Jawab",
        paragraphs: [
            "Layanan disediakan \"sebagaimana adanya\". Sejauh diizinkan oleh hukum yang berlaku, pengelola CocoaScan tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan, termasuk kerugian akibat keputusan yang diambil berdasarkan Hasil Deteksi.",
        ],
    },
    {
        id: "ketersediaan",
        title: "Ketersediaan dan Perubahan Layanan",
        items: [
            "Kami berupaya menjaga Layanan tetap tersedia, tetapi tidak menjamin Layanan bebas dari gangguan atau kesalahan.",
            "Fitur dapat diubah, ditambah, atau dihentikan sewaktu-waktu.",
        ],
    },
    {
        id: "penghentian",
        title: "Penangguhan dan Penghentian Akun",
        paragraphs: [
            "Kami dapat menangguhkan atau menghentikan akun yang melanggar Syarat dan Ketentuan ini. Anda juga dapat berhenti menggunakan Layanan kapan saja.",
        ],
    },
    {
        id: "perubahan",
        title: "Perubahan Syarat dan Ketentuan",
        paragraphs: [
            "Syarat dan Ketentuan ini dapat diperbarui dari waktu ke waktu. Versi terbaru akan ditampilkan di halaman ini beserta tanggal pembaruannya. Dengan tetap menggunakan Layanan setelah perubahan berlaku, Anda dianggap menyetujui versi terbaru.",
        ],
    },
    {
        id: "hukum",
        title: "Hukum yang Berlaku dan Kontak",
        paragraphs: [
            "Syarat dan Ketentuan ini diatur berdasarkan hukum Republik Indonesia.",
            `Pertanyaan atau permintaan terkait Syarat dan Ketentuan ini dapat dikirim melalui email ke ${TERMS_CONTACT_EMAIL}.`,
        ],
    },
];