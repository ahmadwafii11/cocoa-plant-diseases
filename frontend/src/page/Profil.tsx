import {
    CircleUser,
    Mail,
    User,
    CalendarDays,
    LockKeyhole,
    Pencil,
    ShieldCheck,
    Camera,
} from "lucide-react";

function Profil() {
    // Data sementara
    // Nantinya data ini bisa berasal dari API/backend
    const user = {
        fullName: "Ahmad Wafi",
        username: "ahmadwafi",
        email: "ahmad@email.com",
        profileImage: "",
        createdAt: "13 Agustus 2026",
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
            {/* HEADER */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Profil
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Kelola informasi akun dan profil Anda di CocoaScan.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* PROFILE HEADER CARD */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* GREEN HEADER */}
                    <div className="h-32 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500" />

                    {/* PROFILE INFORMATION */}
                    <div className="px-6 pb-6 sm:px-8">

                        <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            {/* AVATAR */}
                            <div className="relative">

                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user.fullName}
                                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-green-100 text-green-700 shadow-md">
                                        <CircleUser className="h-16 w-16" />
                                    </div>
                                )}

                                {/* CAMERA BUTTON */}
                                <button
                                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-md transition hover:bg-green-700"
                                    title="Ubah foto profil"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            {/* NAME */}
                            <div className="flex-1 sm:pb-1">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {user.fullName}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    @{user.username}
                                </p>
                            </div>

                            {/* EDIT BUTTON */}
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Profil
                            </button>
                        </div>

                        {/* MEMBER SINCE */}
                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4" />

                            <span>
                                Bergabung sejak {user.createdAt}
                            </span>
                        </div>
                    </div>
                </div>

                {/* PERSONAL INFORMATION */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                <User className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Informasi Pribadi
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Informasi dasar akun Anda.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                        {/* FULL NAME */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Nama Lengkap
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                <User className="h-5 w-5 text-gray-400" />

                                <span className="text-sm text-gray-800">
                                    {user.fullName}
                                </span>
                            </div>
                        </div>

                        {/* USERNAME */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Username
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                <CircleUser className="h-5 w-5 text-gray-400" />

                                <span className="text-sm text-gray-800">
                                    @{user.username}
                                </span>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-600">
                                Email
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                <Mail className="h-5 w-5 text-gray-400" />

                                <span className="text-sm text-gray-800">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SECURITY */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-6">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Keamanan Akun
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Kelola keamanan akun CocoaScan Anda.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                <LockKeyhole className="h-5 w-5 text-gray-500" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Password
                                </p>

                                <p className="text-xs text-gray-500">
                                    ••••••••••••
                                </p>
                            </div>

                        </div>

                        <button className="rounded-lg px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50">
                            Ubah Password
                        </button>

                    </div>
                </div>

                {/* ACCOUNT INFO */}
                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                    <div className="flex gap-3">

                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <div>
                            <h3 className="text-sm font-semibold text-green-800">
                                Akun CocoaScan
                            </h3>

                            <p className="mt-1 text-sm leading-relaxed text-green-700">
                                Data profil digunakan untuk mengidentifikasi
                                pengguna dan menyimpan riwayat hasil deteksi
                                penyakit tanaman kakao.
                            </p>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
}

export default Profil;