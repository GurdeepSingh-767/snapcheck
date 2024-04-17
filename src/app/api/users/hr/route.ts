import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {NextRequest, NextResponse} from 'next/server';

dbConnect();

export async function GET(request: NextRequest){
    try {
        const hr_id= await getDataFromToken(request);
        
        const hr = await UserModel.findOne({_id: hr_id}).select("-password");
        
        return NextResponse.json({
            message:"HR found",
            data:hr
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            { status:400}
        );
        
    }
}
