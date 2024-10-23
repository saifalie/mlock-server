import mongoose, { Schema } from 'mongoose';

const LockerStationSchema = new Schema(
    {
        stationName: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['OPEN', 'CLOSED', 'MAINTENANCE'],
            default: 'CLOSED'
        },
        location: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        },

        images: [
            {
                url: {
                    type: String,
                    required: true
                }
            }
        ],

        ratings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Rating'
            }
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        lockers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Locker'
            }
        ]
    },
    { timestamps: true }
);

export const LockerStation = mongoose.model('LockerStation', LockerStationSchema);
