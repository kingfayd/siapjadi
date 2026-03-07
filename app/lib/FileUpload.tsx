'use client'

import { useState } from 'react'
import { uploadOrderFile } from '@/app/lib/storage'

interface FileUploadProps {
    orderId: string
    path: 'requirements' | 'submissions'
    onUploadComplete: (url: string) => void
    label?: string
}

export function FileUpload({ orderId, path, onUploadComplete, label }: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError(null)

        try {
            const publicUrl = await uploadOrderFile(file, path, orderId)
            onUploadComplete(publicUrl)
        } catch (err: any) {
            setError(err.message || 'Gagal mengupload file')
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>}
            <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-primary/50 transition-colors group">
                <label className="flex-1 cursor-pointer">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-700 shadow-sm border flex items-center justify-center group-hover:scale-105 transition-transform">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Pilih file...</p>
                            <p className="text-xs text-slate-400">Zipped, PDF, atau Doc</p>
                        </div>
                    </div>
                </label>
                {uploading && (
                    <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    )
}
