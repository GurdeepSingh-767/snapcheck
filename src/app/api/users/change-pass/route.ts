import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
    await dbConnect();

    try {
        const { userId, password } = await request.json();

        // Check if the user exists
        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        existingUser.password = hashedPassword;
        await existingUser.save();

        return Response.json(
            {
                success: true,
                message: "Password updated"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error('Error updating password:', error);
        return Response.json(
            {
                success: false,
                message: "Error updating password"
            },
            {
                status: 500
            }
        );
    }
}
