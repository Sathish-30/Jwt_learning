import jwt from "jsonwebtoken";

const accessToken = (user) => {
    return jwt.sign(
        {
            id : user._id,
            email : user.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"2h"
        }
    );
}

export default accessToken;