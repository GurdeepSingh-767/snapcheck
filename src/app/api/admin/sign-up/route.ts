import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    await dbConnect()

    try {
       const {name,email,contact_number,password}= await request.json()
       const existingUserByEmail= await AdminModel.findOne({
        email
       })
       
       if (existingUserByEmail) {
        return Response.json(
            {
                success: false,
                message: "User with the email already exist"
            },
            {
                status: 400
            }
        )  
       }else{
        const hashedPassword= await bcrypt.hash(password,10)
        const newUser=new AdminModel({
            name: name,
            email,
            contact_number,
            password: hashedPassword,
        })

        await newUser.save()
        return Response.json(
            {
                success: true,
                message: "Admin created"
            },
            {
                status: 200
            }
        )
       }


    } catch (error) {
        console.error('Error registering internal HR',error);
        return Response.json(
            {
                success: false,
                message: "Error registering internal HR"
            },
            {
                status: 500
            }
        )
    }
}