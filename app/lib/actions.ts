'use server'

import prisma from '@/app/lib/prisma'
import { OrderStatus } from '@prisma/client'

export async function createOrder(data: {
    subject: string
    description: string
    deadline: string
    clientId: string
    fileUrl?: string
}) {
    try {
        const order = await prisma.order.create({
            data: {
                subject: data.subject,
                description: data.description,
                deadline: new Date(data.deadline),
                clientId: data.clientId,
                fileUrl: data.fileUrl,
                status: OrderStatus.PENDING,
            },
        })
        return { success: true, order }
    } catch (error) {
        console.error('Failed to create order:', error)
        return { success: false, error: 'Gagal membuat pesanan' }
    }
}

export async function submitAssignment(data: {
    orderId: string
    fileUrl: string
    notes?: string
}) {
    try {
        const submission = await prisma.submission.create({
            data: {
                orderId: data.orderId,
                fileUrl: data.fileUrl,
                notes: data.notes,
            },
        })

        // Update order status to COMPLETED (or REVISION if needed later)
        await prisma.order.update({
            where: { id: data.orderId },
            data: { status: OrderStatus.COMPLETED },
        })

        return { success: true, submission }
    } catch (error) {
        console.error('Failed to submit assignment:', error)
        return { success: false, error: 'Gagal mengirim tugas' }
    }
}
