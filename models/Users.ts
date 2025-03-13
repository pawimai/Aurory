import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            default: false,
        },
        profileImage: { 
            type: String, 
            default: "/baby_chick.svg" }
    },
    {
        timestamps: true
    }
)

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);
export default Users;