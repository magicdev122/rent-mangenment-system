const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
    name : {
        type: String,
    },
    email : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    emergencyContact : {
        type: String,
        required: true,
    },
    address: [{
        house:{
            type: String,
        },
        room: {
            type: String,
        },
    },]
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback){
    const query = {_id: id};
    User.findOne(query, callback);
}

module.exports.getAllUsers = function(callback){
    const query = {};
    User.find(query, callback);
}

module.exports.getUserByName = function(name, callback){
    const query = {name: name};
    User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    User.findOne({email: newUser.email}, (err, user) => {
        if(user) {
            callback(new Error("Email already registered."), user);
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                });
            });
        }
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.setAddress = function(address, callback){
    User.findOne({email: address.userData[0].email}, (err, user) => {
        if(user) {
            if(user.address.length) {
                callback(new Error('Address already registered'))
            } else {
                user.address.unshift({house: address.house, room: address.room});
                user.save(callback)
            }
        } else {
            callback(new Error("User not found"));
        }
    })
    
}