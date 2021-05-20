var mongoose= require("mongoose");

var AllRooms= new mongoose.Schema({
    allrooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ROOM"
        }
    ]
});

//setup svhema to a model
module.exports=mongoose.model('ALLROOMS', AllRooms);