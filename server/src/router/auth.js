const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = require('../middleware/authenticate');

require('../db/connec');
const User = require('../models/userSchema');


router.post('/register', async (req, res) => {
    console.log('Hello');
    console.log(req.body);
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        console.log('Please enter');
        return res.status(422).json({ error:"Please fill all required fields" });
    }

    try {
        const userExists = await User.findOne({ email: email });
        
        if(userExists) {
            return res.status(422).json({ error:"User with same email already exists" });
        }
        const user = new User({ userName, email, password });

        const userRegistered = await user.save();

        if(userRegistered) {
            res.status(201).json({message:"User registered successfully"});
        }
    } catch (error) {
        console.log(error);
    } 
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).json({ error:"Please fill all required fields" });
    }

    try {
        const userExists = await User.findOne({ userName: userName });

        if (userExists){
            isMatch = await bcrypt.compare(password, userExists.password);
            
            const token = await userExists.generateAuthToken();
            console.log(token);

            res.cookie("jwtToken", token, { 
                expires:new Date(Date.now(), 25892000000),
                httpOnly:true
            });
            
            if (!isMatch) {
                res.status(400).json({error: "Invalid credentials"});   
            } else {
                res.json({message: "Logged In successfully"});
            }
        }
        else{
            res.status(400).json({error: "Invalid credentials"});
        }
        
        
    } catch (error) {
        console.log(error);
    } 
});

router.get('/roomsforuser', authenticate, (req, res) => {
    console.log("Hello From Room");
    res.send(req.rootUser);
});

router.get('/logout', (req, res) => {
    console.log("Loggin out");
    res.clearCookie('jwtToken', {path:'/'})
    res.status(200).send("Logged out successfully");
});

router.get('/inaroom', authenticate, (req, res) => {
    console.log("Hello From inside Room");
    res.send(req.rootUser);
})

router.get('/checkforUser', (req, res)=>{
    console.log("checking for Token-->");
    try {
        console.log("checking userA-->")
        console.log(req.cookies)
        console.log(Object.keys(req.cookies).length+"length");
        console.log(req.cookies.jwtToken+"-->jwttok");
        if (req.cookies.jwtToken===undefined) {
            res.status(200).json({isuser: "0"});
        }
        else{
            res.status(200).json({isuser: "1"});
        }

    } catch (error) {
        res.status(200).json({message: "Some error occured"});
    }
})
module.exports = router;