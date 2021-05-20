const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const room = require('./roomSchema')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roomsJoinedByMe:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ROOM"
        }
    ],
    roomsCreatedByMe:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ROOM"
        },
    ],
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    console.log('outside');
    if (this.isModified('password')) {
        console.log('inside');

        this.password = await bcrypt.hash(this.password, 12);
        console.log(this.password);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try {
        let currToken = jwt.sign({ _id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: currToken });
        await this.save();
        return currToken;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;