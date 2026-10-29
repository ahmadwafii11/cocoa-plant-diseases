# Panduan style CocoaScan

## 1. Cara kerjanya

```
src/styles/*.css     <- DESAIN ada di sini (class bernama, mis. .btn-primary)
src/components/*.tsx <- React hanya memanggil nama class: className="btn btn-primary"
```

Di file `.css`, desain disusun dari class Tailwind memakai `@apply`:

```css
.btn-primary {
  @apply bg-lime-300 text-green-950;   /* latar hijau limau, teks hijau tua */
}
```

Artinya: "`.btn-primary` = gabungan class Tailwind `bg-lime-300` dan `text-green-950`".
Setiap `@apply` diberi komentar berisi arti tiap class Tailwind-nya.

## 2. Peta file: desain mana ada di file mana

| Ingin mengubah...                       | Buka file                |
|-----------------------------------------|--------------------------|
| Tombol (warna, ukuran, hover)           | `styles/button.css`      |
| Label pil kecil                         | `styles/badge.css`       |
| Navbar, logo, footer, lebar konten      | `styles/layout.css`      |
| Ukuran / warna ikon                     | `styles/icon.css`        |
| Jarak section, judul section            | `styles/section.css`     |
| Hero, kartu fitur, langkah, CTA         | `styles/landing.css`     |

## 3. Cara membaca sebuah class Tailwind

Bentuk umum: `[kondisi:]kategori-nilai`

| Contoh            | Dibaca                                                         |
|-------------------|----------------------------------------------------------------|
| `bg-lime-300`     | **b**ac**kg**round warna lime tingkat 300                      |
| `text-white`      | warna teks putih                                               |
| `text-sm`         | ukuran huruf kecil (14px)                                      |
| `px-4`            | padding kiri-kanan 16px                                        |
| `mt-6`            | margin atas 24px                                               |
| `hover:bg-white/10` | SAAT di-hover: latar putih 10% kepekatan                     |
| `sm:px-6`         | MULAI layar >= 640px: padding kiri-kanan 24px                  |
| `lg:grid-cols-2`  | MULAI layar >= 1024px: grid 2 kolom                            |
| `text-[10px]`     | ukuran bebas (kurung siku): tepat 10px                         |

## 4. Skala ukuran (angka x 4px)

`1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px, `5` = 20px, `6` = 24px,
`8` = 32px, `10` = 40px, `12` = 48px, `16` = 64px, `20` = 80px, `24` = 96px.

Dipakai oleh: `p-`, `px-`, `py-`, `m-`, `mt-`, `mb-`, `gap-`, `h-`, `w-`.

## 5. Awalan (prefix) layar & kondisi

| Awalan    | Berlaku saat                         |
|-----------|--------------------------------------|
| (tanpa)   | semua ukuran layar (mulai dari HP)   |
| `sm:`     | lebar layar >= 640px                 |
| `md:`     | lebar layar >= 768px                 |
| `lg:`     | lebar layar >= 1024px                |
| `hover:`  | kursor di atas elemen                |
| `focus-visible:` | elemen dipilih lewat keyboard |
| `disabled:` | elemen dinonaktifkan               |

## 6. Warna dan transparansi

- `green-50` (paling muda) ... `green-950` (paling tua).
- `/10`, `/20`, `/80` di belakang warna = kepekatan. `bg-white/10` = putih 10%
  (hampir bening), `bg-green-900/80` = hijau tua 80%.

## 7. Menambah desain baru

1. Buat class di file `.css` yang sesuai, di dalam `@layer components { ... }`.
2. Susun desainnya dengan `@apply ...` dan beri komentar.
3. Panggil di React: `<div className="nama-class">`.

Hindari menulis `@apply` dengan class buatan sendiri (mis. `@apply btn`).
Jika perlu menggabungkan, pakai dua class di React: `className="btn btn-primary"`.
