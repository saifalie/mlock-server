import mongoose, { Document, Schema, Types } from 'mongoose';

enum WeekDay {
    MONDAY = 'Mon',
    TUESDAY = 'Tue',
    WEDNESDAY = 'Wed',
    THURSDAY = 'Thu',
    FRIDAY = 'Fri',
    SATURDAY = 'Sat',
    SUNDAY = 'Sun'
}

interface LockerStation extends Document {
    station_name: string;
    status: 'OPEN' | 'CLOSED' | 'MAINTENANCE';
    location: {
        type: string;
        coordinates: [];
    };
    address: string;
    images: { url: string }[];
    ratings: Types.ObjectId[];
    reviews: Types.ObjectId[];
    lockers: Types.ObjectId[];
    opening_hours: {
        day: WeekDay;
        opens_at: string;
        closes_at: string;
        is_closed: boolean;
    }[];
    markedFavourite: Types.ObjectId[];
}

const LockerStationSchema = new Schema<LockerStation>(
    {
        station_name: {
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
            type: { type: String, enum: ['Point'], required: true },
            coordinates: {
                type: [Number],
                required: true,
                index: '2dsphere'
            }
        },
        address: { type: String, required: true },

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
        ],
        opening_hours: [
            {
                day: {
                    type: String,
                    enum: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                    default: 'Mon'
                },
                opens_at: {
                    type: String,
                    default: '06:00'
                },
                closes_at: {
                    type: String,
                    default: '22:00'
                },
                is_closed: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        markedFavourite: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
);

export const LockerStation = mongoose.model<LockerStation>('LockerStation', LockerStationSchema);
