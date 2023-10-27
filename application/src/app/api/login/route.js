import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../models/user';
const mongoose = require("mongoose");

export async function POST(req) {
    await dbConnect();

    const res = Response;
    // return NextResponse.json({ message: 'Hello world!' }, { status: 200 })
    // const response = await User.find()
    // console.log(response)
    User.find({ email: req.body.email })
        .exec()
        // users is an array, but there is only ever one user with that email.
        // users is always of size 1 or less
        .then((users) => {
            // if user.length is less than 1, then email does not exist
            if (users.length < 1) {
                return res.json({
                    message: "Auth failed",
                    // message: 'Mail not found, user does not exist'
                    // this is not a good approach because it will tell the user that the email does not exist
                }, { status: 401 });
            }
            // if user.length is greater than 1, then email already exists
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                // if result is true, then password matches
                if (err) {
                    return res.json({
                        message: "Auth failed",
                    }, { status: 401 });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: users[0].email,
                            userId: users[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.json({
                        message: "Auth successful",
                        token: token
                        // jwt can be decoded by jwt.io with the secret key
                    }, { status: 200 });
                }
                // if result is false, then password does not match
                return res.json({
                    message: "Auth failed",
                }, { status: 401 });
            });
    })
            .catch (err => {
        console.log(err);
        return res.json({
            error: err
        }, { status: 500 });
    });
}