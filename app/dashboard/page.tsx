'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (error || !user) {
                router.push('/login')
                return
            }

            setUser(user)
            setLoading(false)
        }

        checkUser()
    }, [router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        )
    }

    const role = user?.user_metadata?.role || 'KLIEN'

    return (
        <div className="min-h-screen bg-accent/5">
            {/* Shared Dashboard Shell */}
            <nav className="border-b bg-card h-16 flex items-center px-8 justify-between sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">S</span>
                    </div>
                    <span className="font-bold">Dashboard {role}</span>
                </div>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/')
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    Keluar
                </button>
            </nav>

            <main className="container mx-auto py-8 px-4 sm:px-8">
                {role === 'ADMIN' && <AdminDashboard user={user} />}
                {role === 'PENJOKI' && <PenjokiDashboard user={user} />}
                {role === 'KLIEN' && <KlienDashboard user={user} />}
            </main>
        </div>
    )
}

function AdminDashboard({ user }: { user: any }) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Overview Bisnis</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Order', value: '12', color: 'blue' },
                    { label: 'Penghasilan', value: 'Rp 2.500.000', color: 'green' },
                    { label: 'Penjoki Aktif', value: '5', color: 'amber' },
                    { label: 'Pending Payment', value: '3', color: 'red' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl border bg-card">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
            <div className="p-8 rounded-xl border bg-card h-64 flex items-center justify-center text-muted-foreground">
                Tabel antrian order akan muncul di sini...
            </div>
        </div>
    )
}

function PenjokiDashboard({ user }: { user: any }) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Marketplace Tugas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="p-6 rounded-xl border bg-card space-y-4">
                        <div className="flex justify-between items-start">
                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">Matematika</span>
                            <span className="text-sm font-bold text-green-600">Rp 150.000</span>
                        </div>
                        <h3 className="font-bold">Kalkulus Lanjut - Bab 3</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">Deskripsi tugas yang diorder oleh klien akan muncul di sini secara singkat...</p>
                        <div className="pt-4 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Deadline: 2 hari lagi</span>
                            <button className="text-sm font-bold text-primary hover:underline">Ambil Tugas</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function KlienDashboard({ user }: { user: any }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tugas Saya</h1>
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                    Order Tugas Baru
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="p-8 rounded-xl border bg-card border-dashed flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                        <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium">Belum ada order aktif</p>
                        <p className="text-sm text-muted-foreground">Mulai dengan mengklik tombol Order Tugas Baru di atas.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
