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
        latitude: number;
        longitude: number;
        address: string;
    };
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
        ]
    },
    { timestamps: true }
);

export const LockerStation = mongoose.model<LockerStation>('LockerStation', LockerStationSchema);
