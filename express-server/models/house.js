const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HouseSchema =new Schema({
    name : {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    baseRent : {
        type: String,
        required: true,
    },
    internet : {
        type: String,
    },
    insurance : {
        type:  String,
    },
    variables : [
        {   
            month: {
                type: String,
            },
            heat: {
                type:String,
            },
            hydro: {
                type:String,
            },
            water: {
                type:String
            }
        }
    ],
    rooms : [
        {
            name: {
                type: String,
            },
            sharePercentage : {
                type: String,
            }
        },
    ],
    residents : [
        {
            type: Schema.Types.ObjectId
        },
    ]
});

const House = module.exports = mongoose.model("House", HouseSchema);

module.exports.addHouse = function(newHouse, callback){
    House.findOne({name: newHouse.name}, (err, house) => {
        if(house) {
            callback(new Error("House already registered."), house);
        }
        else {
            newHouse.save(callback);
        }
    })
}

module.exports.addRoom = async function(newRoom, callback){
    const house = await House.findOne({name: newRoom.houseName});
    
    if(house.rooms.some((room) => room.name === newRoom.name)) {
        callback(new Error("Room already exist"))
    } else {
        house.rooms.unshift({name: newRoom.name, sharePercentage: newRoom.sharePercentage});
        await house.save(callback);
    }
}

module.exports.addVariable = async function(newVariable, callback){
    const house = await House.findOne({name: newVariable.house});
    //console.log(house)
    
    if(house.variables.some((variable) => variable.month === newVariable.month)) {
        callback(new Error("That month variable already registered"))
    } else {
        house.variables.unshift({month: newVariable.month, heat: newVariable.heat, hydro: newVariable.hydro, water: newVariable.hydro});
        await house.save(callback);
    }
}

