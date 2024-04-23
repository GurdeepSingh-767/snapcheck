import mongoose, { Schema, Document } from "mongoose";

// Create and export the Admin model
export interface Admin extends Document {
    name: string;
    email: string;
    contact_number: string;
    password: string;
}

const AdminSchema: Schema<Admin> = new Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    contact_number: { 
        type: String, 
        required: [true, "Contact number is required"], 
        match: [/^\d{10}$/, 'Please enter a valid contact number'] 
    },
    password: { type: String, required: [true, "Password is required"] }
},
{
    timestamps: true
});

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || mongoose.model<Admin>("Admin", AdminSchema);
export default AdminModel;
