import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const Service = {
    decodeService: (req: NextRequest) => {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.secret_key || "Devmode") as jwt.JwtPayload;
            return decoded;
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
    }
}

export default Service;