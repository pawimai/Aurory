import mongoose, { Schema } from "mongoose";

const calendarSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: String,
        },
        emotion: {
            type: String,
        },
        story: {
            type: String,
        },
        isStarred: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)

const Calendar = mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema);
export default Calendar;