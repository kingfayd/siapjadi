import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SiapJadi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">Fitur</Link>
            <Link href="#roles" className="text-sm font-medium hover:text-primary">Role</Link>
            <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">Mulai Sekarang</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-8 bg-gradient-to-b from-background to-accent/20">
          <div className="container text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Solusi <span className="text-primary">Joki Tugas</span> Profesional & Terpercaya
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Platform all-in-one yang menghubungkan mahasiswa dengan penjoki ahli. Transparan, aman, dan tepat waktu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="h-12 px-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg hover:scale-105 transition-transform">
                Join Sebagai Klien
              </Link>
              <Link href="/register?role=penjoki" className="h-12 px-8 rounded-full border border-primary text-primary flex items-center justify-center font-semibold text-lg hover:bg-primary/5 transition-colors">
                Daftar Jadi Penjoki
              </Link>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section id="roles" className="py-24 px-4 sm:px-8">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Satu Platform, Tiga Peran Utama</h2>
              <p className="text-muted-foreground">Sistem yang dirancang khusus untuk kenyamanan setiap pengguna.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Klien */}
              <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Klien (Mahasiswa)</h3>
                <ul className="space-y-3 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">✓ Order tugas dengan mudah</li>
                  <li className="flex items-center gap-2">✓ Tracking progress real-time</li>
                  <li className="flex items-center gap-2">✓ Pembayaran aman & terverifikasi</li>
                  <li className="flex items-center gap-2">✓ Chat langsung dengan admin</li>
                </ul>
              </div>

              {/* Penjoki */}
              <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-shadow border-primary/20 bg-primary/[0.02]">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Penjoki (Expert)</h3>
                <ul className="space-y-3 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">✓ Marketplace tugas harian</li>
                  <li className="flex items-center gap-2">✓ Manajemen tugas terorganisir</li>
                  <li className="flex items-center gap-2">✓ Withdraw penghasilan cepat</li>
                  <li className="flex items-center gap-2">✓ Sistem submit yang simpel</li>
                </ul>
              </div>

              {/* Owner */}
              <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-6">
                  <svg className="h-6 w-6 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Owner (Admin)</h3>
                <ul className="space-y-3 text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">✓ Dashboard statistik lengkap</li>
                  <li className="flex items-center gap-2">✓ Plotting tugas ke penjoki</li>
                  <li className="flex items-center gap-2">✓ Verifikasi pembayaran</li>
                  <li className="flex items-center gap-2">✓ Manajemen user & sengketa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-8">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight">SiapJadi</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SiapJadi Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
