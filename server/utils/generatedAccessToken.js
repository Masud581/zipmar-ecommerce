import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const generateAccessToken = async (userId) => {
    const token = await jwt.sign({userId}, 
    process.env.SECRET_KEY_ACCESS_TOKEN, {expiresIn: '5H'});
    return token;

    
}

export default generateAccessToken;