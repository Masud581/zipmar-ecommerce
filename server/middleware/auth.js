import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.accessToken || (authHeader && authHeader.split(" ")[1]); // Get the token

        // If no token is provided
        if (!token) {
            return res.status(401).json({
                message: "Token not provided",
                error: true,
                success: false,
            });
        }

        // Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized Access",
                error: true,
                success: false,
            });
        }

        req.userId = decode.userId; // Assign decoded userId to req.userId
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

export default auth;
