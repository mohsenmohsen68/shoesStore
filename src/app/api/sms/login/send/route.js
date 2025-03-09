const request = require('request');
import connectToDB from "@/root/configs/db"
import Otp from "@/root/models/Otp";
import userModel from "@/root/models/User";
import { validatePhoneNumber } from "@/root/util/auth/auth";

export async function POST(req) {
    connectToDB();
    const body = await req.json();
    const { phoneNumber } = body
    const expTime = new Date().getTime() + 180_000;
    let min = 10000;
    let max = 99999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min; // five digit number ...
    console.log("phone=>", phoneNumber, "code+>", code)

    if (!validatePhoneNumber(phoneNumber)) {
        return Response.json({ message: "شماره تلفن وارد شده نامعتبراست .", status: 400 })
    }

    const user = await userModel.findOne( { phoneNumber } )
    if(!user){
        return Response.json({ message: "user does not exists" }, { status: 400 })
    }else{
        request.post({
            url: 'http://ippanel.com/api/select',
            body: {
                "op": "pattern",
                "user": "u09390804084",
                "pass": "Faraz@1984512900005361",
                "fromNum": "+98BANK",
                "toNum": phoneNumber,
                "patternCode": "4cwoafmvwcfmxcb",
                "inputData": [
                    { "verification-code": code },
                ]
            },
            json: true,
        },
            async function (error, response, body) {
                if (!error && response.statusCode === 200) {
                        await Otp.create({
                            code,
                            phoneNumber,
                            expTime,
                        })
                        return Response.json({ message: "code sent successfully" }, { status: 200 })
                } else {
                    return Response.json({ message: "something went wrong" }, { status: 500 })
                }
            });
            return Response.json({ message: "code sent successfully" }, { status: 201 })
    }
}