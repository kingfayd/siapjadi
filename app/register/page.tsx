'use client'

import { Suspense, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function RegisterContent() {
    const searchParams = useSearchParams()
    const roleParam = searchParams.get('role')?.toLowerCase()

    let initialRole = 'KLIEN'
    if (roleParam === 'penjoki') initialRole = 'PENJOKI'
    if (roleParam === 'admin') initialRole = 'ADMIN'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState(initialRole)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    role: role,
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-accent/20 px-4 text-center">
                <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-lg">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Cek Email Kamu</h2>
                    <p className="text-muted-foreground">
                        Kami telah mengirimkan link konfirmasi ke <strong>{email}</strong>. Silakan verifikasi untuk melanjutkan.
                    </p>
                    <Link href="/login" className="block w-full h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-accent/20 px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-8 shadow-lg">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">SiapJadi</span>
                    </Link>
                    <h2 className="text-2xl font-bold">Buat Akun Baru</h2>
                    <p className="text-sm text-muted-foreground mt-2">Mulai perjalananmu di SiapJadi</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {error && (
                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Role Saya</label>
                            <div className={`grid gap-4 ${role === 'ADMIN' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                <button
                                    type="button"
                                    onClick={() => setRole('KLIEN')}
                                    className={`h-11 px-4 rounded-lg border text-sm font-medium transition-all ${role === 'KLIEN' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'}`}
                                >
                                    Klien (Mahasiswa)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('PENJOKI')}
                                    className={`h-11 px-4 rounded-lg border text-sm font-medium transition-all ${role === 'PENJOKI' ? 'bg-primary border-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
                                >
                                    Penjoki (Expert)
                                </button>
                                {role === 'ADMIN' && (
                                    <button
                                        type="button"
                                        onClick={() => setRole('ADMIN')}
                                        className="h-11 px-4 rounded-lg border text-sm font-medium transition-all bg-primary border-primary text-primary-foreground"
                                    >
                                        Owner (Admin)
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                required
                                className="w-full h-12 px-4 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full h-12 px-4 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full h-12 px-4 rounded-lg bg-background border focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="Min. 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Daftar...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Masuk
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <RegisterContent />
        </Suspense>
    )
}
