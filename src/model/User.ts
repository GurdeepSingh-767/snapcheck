import mongoose, { Schema, Document } from "mongoose";

// Create and export the InternalHr model
export interface InternalHrModel extends Document {
    name: string;
    email: string;
    password: string;
}

const InternalHrSchema: Schema<InternalHrModel> = new Schema({
    name: { type: String, required: [true,"Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    password: { type: String, required: [true,"Password is required"] }
});




 
const UserModel= (mongoose.models.InternalHr as mongoose.Model<InternalHrModel>)|| mongoose.model<InternalHrModel>("InternalHr", InternalHrSchema);
export default UserModel;