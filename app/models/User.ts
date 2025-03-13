import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    favorite: [{type: mongoose.Schema.Types.ObjectId , ref: "Calendar"}]
})

export default mongoose.model("User", User);