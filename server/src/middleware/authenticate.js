const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const authenticate = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.jwtToken;
        const verificationResult = await jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id: verificationResult._id, "tokens.token": token});

        if (!rootUser) {
            throw new Error("Could not find User");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send({error: "No token provided"});
        console.log(error);
    }
}

module.exports = authenticate;