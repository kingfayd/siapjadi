'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/app/lib/FileUpload'
import { createOrder } from '@/app/lib/actions'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
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
                {role === 'ADMIN' && <AdminDashboard />}
                {role === 'KLIEN' && <KlienDashboard user={user as User} />}
            </main>
        </div>
    )
}

function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Overview Bisnis</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Order', value: '12', color: 'blue' },
                    { label: 'Penghasilan', value: 'Rp 2.500.000', color: 'green' },
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


function KlienDashboard({ user }: { user: User }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const orders: unknown[] = []
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        deadline: '',
        fileUrl: ''
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tugas Saya</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                >
                    Order Tugas Baru
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl border-0 space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center border-b pb-4 -mx-2">
                            <h2 className="text-xl font-bold tracking-tight">Order Tugas Baru</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <span className="text-2xl leading-none">×</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Mata Pelajaran / Subjek</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Contoh: Matematika"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-200">Deskripsi Tugas</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24"
                                    placeholder="Jelaskan detail tugas..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-200">Deadline</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>

                            <FileUpload
                                orderId={`req-${user.id}-${Date.now()}`}
                                path="requirements"
                                label="Lampiran Tugas (Optional)"
                                onUploadComplete={(url) => setFormData({ ...formData, fileUrl: url })}
                            />
                            {formData.fileUrl && <p className="text-xs text-green-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">✓ Terpilih: {formData.fileUrl.split('/').pop()}</p>}
                        </div>

                        <button
                            onClick={async () => {
                                const res = await createOrder({
                                    ...formData,
                                    clientId: user.id
                                })
                                if (res.success) {
                                    setIsModalOpen(false)
                                    setFormData({ subject: '', description: '', deadline: '', fileUrl: '' })
                                    alert('Order berhasil dibuat!')
                                    // Normally you'd refresh data here
                                }
                            }}
                            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90"
                        >
                            Konfirmasi Order
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {orders.length === 0 ? (
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
                ) : (
                    <div className="space-y-4">
                        {/* List orders here */}
                    </div>
                )}
            </div>
        </div>
    )
}
