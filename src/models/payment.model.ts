import { Document, model, Schema } from 'mongoose';

enum Currency {
    INR = 'INR'
}

interface Payment extends Document {
    order_id: string;
    payment_id: string;
    signature: string;
    amount: number;
    currency: Currency;
    status: string;
    method: string;
    card_id: string;
    bank: string;
    wallet: string;
}

const paymentSchema = new Schema<Payment>({
    order_id: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: Object.values(Currency),
        default: Currency.INR
    },
    status: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    card_id: {
        type: String
    },
    bank: {
        type: String
    },
    wallet: {
        type: String
    }
},{timestamps:true});

export const Payment = model<Payment>('Payment', paymentSchema);
