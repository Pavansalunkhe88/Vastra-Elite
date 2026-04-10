import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    contact:{ type: String, required: true },
    password:{ type: String, required: true },
    fullname:{ type: String, required: true },
    role:{ type: String, enum: ["buyer", "seller"], default: "buyer" },
})

// Hash password before saving
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

// Method to compare password during login
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


export const userModel = mongoose.model("user", userSchema);

export default userModel;