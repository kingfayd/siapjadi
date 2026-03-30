'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

type AdminView = 'loading' | 'login' | 'dashboard' | 'denied'

export default function AdminPage() {
    const [view, setView] = useState<AdminView>('loading')
    const [user, setUser] = useState<User | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loggingIn, setLoggingIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setView('login')
                return
            }
            const role = user.user_metadata?.role
            if (role === 'ADMIN') {
                setUser(user)
                setView('dashboard')
            } else {
                setView('denied')
            }
        }
        checkSession()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoggingIn(true)
        setLoginError(null)

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setLoginError(error.message)
            setLoggingIn(false)
            return
        }

        const role = data.user?.user_metadata?.role
        if (role === 'ADMIN') {
            setUser(data.user)
            setView('dashboard')
        } else {
            await supabase.auth.signOut()
            setLoginError('Akun ini tidak memiliki akses admin.')
            setLoggingIn(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setView('login')
        setUser(null)
    }

    // ─── Loading ────────────────────────────────────────────────────────────────
    if (view === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        )
    }

    // ─── Access Denied ──────────────────────────────────────────────────────────
    if (view === 'denied') {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white gap-4">
                <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">🚫</div>
                <h1 className="text-2xl font-bold">Akses Ditolak</h1>
                <p className="text-slate-400 text-sm">Akun Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                >
                    Kembali ke Beranda
                </button>
            </div>
        )
    }

    // ─── Login ──────────────────────────────────────────────────────────────────
    if (view === 'login') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                            <svg className="h-7 w-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                        <p className="text-slate-400 text-sm mt-1">SiapJadi — Akses Terbatas</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginError && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                                {loginError}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Admin</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@siapjadi.id"
                                className="w-full h-12 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-12 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loggingIn}
                            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
                        >
                            {loggingIn ? 'Memverifikasi...' : 'Masuk sebagai Admin'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // ─── Admin Dashboard ─────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navbar */}
            <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur h-16 flex items-center px-8 justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">S</span>
                    </div>
                    <div>
                        <span className="font-bold text-white">Admin Panel</span>
                        <span className="ml-2 text-xs text-slate-400">SiapJadi</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400 hidden sm:block">{user?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors border border-slate-700 px-4 py-1.5 rounded-lg hover:border-slate-500"
                    >
                        Keluar
                    </button>
                </div>
            </nav>

            <main className="container mx-auto py-8 px-4 sm:px-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Overview Bisnis</h1>
                    <p className="text-slate-400 text-sm mt-1">Selamat datang kembali, {user?.user_metadata?.full_name || 'Admin'}.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Order', value: '—', icon: '📋', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/30' },
                        { label: 'Penghasilan', value: '—', icon: '💰', color: 'from-green-500/20 to-green-600/5 border-green-500/30' },
                        { label: 'Pending Payment', value: '—', icon: '⏳', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/30' },
                    ].map((stat, i) => (
                        <div key={i} className={`p-6 rounded-2xl border bg-gradient-to-br ${stat.color} backdrop-blur`}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-slate-400">{stat.label}</p>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Order Table Placeholder */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <h2 className="font-semibold text-white">Antrian Order</h2>
                        <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">Real-time data segera hadir</span>
                    </div>
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-3">
                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-sm">Tabel antrian order akan muncul di sini</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
