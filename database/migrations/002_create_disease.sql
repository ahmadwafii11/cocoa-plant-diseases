CREATE TABLE diseases (
    id BIGSERIAL PRIMARY KEY,

    diseases_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    symptoms TEXT NOT NULL,
    treatment TEXT,
    prevention TEXT,
    image TEXT
);

INSERT INTO diseases (
    diseases_name,
    description,
    symptoms,
    treatment,
    prevention,
    image
)
VALUES
(
    'Busuk Buah',
    'Penyakit busuk buah merupakan salah satu penyakit yang menyerang buah kakao dan dapat menyebabkan kerusakan serta penurunan kualitas buah.',
    'Muncul bercak berwarna cokelat pada permukaan buah yang kemudian berkembang dan menyebabkan jaringan buah membusuk.',
    'Buah yang terinfeksi dapat dipisahkan dan dimusnahkan untuk mengurangi penyebaran penyakit.',
    'Melakukan sanitasi kebun, membuang buah yang terinfeksi, serta menjaga sirkulasi udara di sekitar tanaman.',
    '/images/busuk-buah.jpg'
),
(
    'Helopeltis',
    'Helopeltis merupakan hama yang menyerang bagian tanaman kakao, terutama buah muda, dan dapat menyebabkan kerusakan pada permukaan buah.',
    'Terdapat bercak atau luka pada kulit buah yang dapat berkembang menjadi bagian yang berwarna gelap.',
    'Pengendalian dapat dilakukan melalui sanitasi kebun dan pengendalian populasi hama secara terpadu.',
    'Melakukan pemangkasan, menjaga kebersihan kebun, dan memantau populasi Helopeltis secara berkala.',
    '/images/helopeltis.jpg'
),
(
    'Penggerek Buah Kakao',
    'Penggerek Buah Kakao (PBK) merupakan hama yang menyerang buah kakao dan dapat menyebabkan kerusakan pada bagian dalam buah.',
    'Buah dapat mengalami perubahan warna, biji sulit dipisahkan dari kulit buah, dan perkembangan biji terganggu.',
    'Pengendalian dapat dilakukan melalui pemanenan buah secara teratur dan penerapan teknik pengendalian hama terpadu.',
    'Melakukan pemanenan secara teratur, sanitasi kebun, dan memantau keberadaan hama pada tanaman kakao.',
    '/images/pbk.jpg'
),
(
    'Kakao Sehat',
    'Buah kakao sehat merupakan buah yang tidak menunjukkan gejala serangan penyakit atau hama.',
    'Permukaan buah memiliki kondisi normal tanpa bercak busuk, luka akibat hama, maupun gejala kerusakan lainnya.',
    'Tidak memerlukan penanganan khusus selama kondisi buah dan tanaman tetap sehat.',
    'Melakukan pemeliharaan tanaman secara rutin, menjaga kebersihan kebun, serta melakukan pemantauan terhadap kondisi buah kakao.',
    '/images/kakao-sehat.jpg'
);