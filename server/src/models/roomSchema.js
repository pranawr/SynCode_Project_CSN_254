var mongoose= require("mongoose");

var roomSchema= new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    admin:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"USER"
                },
            userName:String,
            
        },
    time1:{
            type:String,
            default:new Date().toISOString().slice(0,10)
        },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MESSAGE"
        }
    ]
});

//setupsvhema to a model
module.exports=mongoose.model('ROOM', roomSchema);