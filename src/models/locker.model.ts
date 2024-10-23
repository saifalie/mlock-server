import { Schema } from 'mongoose';

const lockerSchema = new Schema({
    lockerNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'BOOKED', 'MAINTENANCE'],
        default: 'AVAILABLE'
    },
    doorStatus: {
        type: String,
        enum: ['OPEN', 'CLOSED'],
        default: 'CLOSED'
    },
    currentUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    size: {
        type: String,
        enum: ['SMALL', 'MEDIUM', 'LARGE'],
        default: 'MEDIUM'
    },
    checkInTime: {
        type: Date
    },
    checkOuTime: {},
    extraTime: {
        type: Number
    },
    rentalPrice: {
        type: Number,
        required: true,
        default: 20
    },
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
});
