import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./libs/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import friendRoute from "./routes/friendRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import {protectedRoute} from "./middlewares/authMiddleware.js";
import cors from "cors";
import {app, server} from "./socket/index.js";

dotenv.config();


const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

//  public routes
app.use('/api/auth', authRoute);


//  private routes
app.use(protectedRoute);
app.use('/api/users', userRoute);
app.use('/api/friends', friendRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversations', conversationRoute);

connectDB().then(async () => {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})

// // nextTick()
// console.log("Start");
// process.nextTick(() => {
//     console.log("nextTick");
// });
// console.log("End");
//
// // setImmediate()
// console.log("Start");
// setImmediate(() => {
//     console.log("setImmediate");
// });
// console.log("End");
//
// // setTimeout()
// console.log("Start");
// setTimeout(() => {
//     console.log("setTimeout");
// }, 0);
// console.log("End");
