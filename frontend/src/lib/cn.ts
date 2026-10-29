/**
 * cn = "class names".
 *
 * Menggabungkan beberapa nama class menjadi satu string dipisah spasi,
 * dan membuang nilai kosong (false / null / undefined).
 *
 * Contoh:
 *   cn("btn", "btn-primary", isBig && "btn-lg")
 *   -> "btn btn-primary btn-lg"   (jika isBig = true)
 *   -> "btn btn-primary"          (jika isBig = false)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
}
