import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    currentLocker: {
        type: Schema.Types.ObjectId,
        ref: 'Locker'
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: { type: Number }
    },
    saved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'LockerStation'
        }
    ],
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
});

export const User = mongoose.model('User', userSchema);
