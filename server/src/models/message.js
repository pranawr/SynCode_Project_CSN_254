var mongoose= require("mongoose");

var messageSchema= mongoose.Schema({
    text:{
       type: String,
       required: true
    },

    time1:{
        type:String,
        default:new Date().toISOString().slice(0,10)
    },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"USER"
        },
        userName:String
    },
    
});

module.exports =mongoose.model("MESSAGE",messageSchema);