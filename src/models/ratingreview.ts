import mongoose, { Schema, Types } from 'mongoose';

interface RatingAndReview {
    user: Types.ObjectId;
    rating: number;
    review: string;
    locker_station: Types.ObjectId;
}

const ratingReviewSchema = new Schema<RatingAndReview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    }
});
