import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
const mongoose = require("mongoose");

//const {searchParams} = new URL(request.url)

// SECURITY RISK - by returning "EMAIL ALREADY EXISTS"
export async function POST(request: Request) {
    await dbConnect();

    try {
        const data = await request.json();
        const email = data.email;
        const password = data.password;
        const username = data.username;
        const location = data.location;

        // check for all fields
        if (!email || !password || !username || !location) {
            return NextResponse.json({ message: "Email, Password, Location, and Username required" }, { status: 400 });
        }

        // check if email exists
        let user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ message: "Email already exists" }, { status: 409 });
        } else {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: password,
                username: username,
                location: location
            });

            console.log(user);
            // NEED TO HASH PASSWORD!!!!
            user.save();
            return NextResponse.json({ message: "User created" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// router.post("/signup", (req, res, next) => {
//     // Check if email already exists
//     User.find({ email: req.body.email })
//       .exec()
//       .then((user) => {
//         // if user.length is greater than 1, then email already exists
//         if (user.length >= 1) {
//           return res.status(409).json({
//             message: "Email already exists",
//           });
//         } else {
//           bcrypt.hash(req.body.password, 10, (err, hash) => {
//             if (err) {
//               return res.status(500).json({
//                 error: err,
//               });
//             } else {
//               const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 email: req.body.email,
//                 password: hash,
//                 username: req.body.username
//               });
//               user
//                 .save()
//                 .then((result) => {
//                   console.log(result);
//                   res.status(201).json({
//                     message: "User created",
//                   });
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   res.status(500).json({
//                     error: err,
//                   });
//                 });
//             }
//           });
//         }
//       });
//   });