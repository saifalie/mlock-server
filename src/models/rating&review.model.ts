import mongoose, { Document, Schema, Types } from 'mongoose';

interface Rating extends Document {
    rating: number;
    user: Types.ObjectId;
    locker_station: Types.ObjectId;
}

interface Review extends Document {
    message: string;
    user: Types.ObjectId;
    locker_station: Types.ObjectId;
    is_visible: boolean;
}

const ratingSchema = new Schema<Rating>(
    {
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        locker_station: {
            type: Schema.Types.ObjectId,
            ref: 'LockerStation'
        }
    },
    { timestamps: true }
);

const reviewSchema = new Schema<Review>(
    {
        message: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        locker_station: {
            type: Schema.Types.ObjectId,
            ref: 'LockerStation'
        },
        is_visible: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export const Rating = mongoose.model<Rating>('Rating', ratingSchema);
export const Review = mongoose.model<Review>('Review', reviewSchema);
