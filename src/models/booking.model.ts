import { Document, model, Schema, Types } from 'mongoose';

export enum PaymentStatus {
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    PENDING = 'PENDING'
}

interface Booking extends Document {
    user: Types.ObjectId;
    locker: Types.ObjectId;
    duration: number;
    checkin_time: Date;
    checkout_time: Date;
    user_checkout_time: Date;
    extra_time: number;
    rental_price: number;
    payments: Types.ObjectId[];
    payment_status: PaymentStatus;
}

const bookingSchema = new Schema<Booking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        locker: {
            type: Schema.Types.ObjectId,
            ref: 'Locker',
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        checkin_time: {
            type: Date,
            required: true
        },
        checkout_time: {
            type: Date,
            required: true
        },
        user_checkout_time: {
            type: Date
        },
        extra_time: {
            type: Number,
            required: true,
            default: 0
        },
        rental_price: {
            type: Number,
            required: true
        },
        payment_status: {
            type: String,
            required: true,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.OVERDUE
        },
        payments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Payment'
            }
        ]
    },
    { timestamps: true }
);

export const Booking = model<Booking>('Booking', bookingSchema);
