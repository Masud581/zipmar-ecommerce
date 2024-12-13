import UserModal from '../models/user.model.js';
import jwt from 'jsonwebtoken';
const generateAccessToken = async (userId) => {
    const token = await jwt.sign({userId}, 
    process.env.SECRET_KEY_REFRESH_TOKEN, {expiresIn: '30d'});

    const updateRefreshToken = await UserModal.updateOne({_id:userId}, {
        refresh_token: token
    }); 
    return token;
}

export default generateAccessToken;