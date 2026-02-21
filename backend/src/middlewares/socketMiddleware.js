import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const socketAuth = async (socket, next) => {
  try{
    const token = socket.handshake.auth.token;
    if(!token){
      return next(new Error('Unauthorized'));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decoded){
      return next(new Error('Unauthorized and invalid token'));
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");

    if(!user) {
      return next(new Error("User not found"))
    }

    socket.user = user;

    next()

  }
  catch(error){
    console.error("Error in socket auth middleware:", error);
    return next(error);
  }
}
