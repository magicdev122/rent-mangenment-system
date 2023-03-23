const express = require("express");
const router = express.Router();
const passport = require ("passport");
const jwt = require ("jsonwebtoken");
const House = require("../models/house");
const config = require("../config/database");

router.post("/add", (req, res, next) => {
    const newHouse = new House({
        name: req.body.name,
        address: req.body.address,
        baseRent: req.body.baseRent,
        internet: req.body.internet,
        insurance: req.body.insurance,
    });

    House.addHouse(newHouse, (err, data)=> {
        if(err){
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true, msg: "House registered."});
        }
    });
});

router.get('/get-house-names', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    House.find({}, (err, houses) => {
        if (err) throw err;
        res.json({houses: houses})
    })
})

router.post('/get-room-names', (req, res, next) => {
    House.findOne({name: req.body.house}, (err, house) => {
        if(err) throw err;
        res.json({rooms: house.rooms})
    })
})

router.post('/get-months', (req, res, next) => {
    House.findOne({name: req.body.house}, (err, house) => {
        if(err) throw err;
        res.json({variables: house.variables})
    })
})

router.post("/addroom", (req, res, next) => {

    House.addRoom(req.body, (err, data) => {
        if(err){
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true, msg: "Room registered."});
        }
    })
})

router.post("/add-variable", (req, res, next) => {
    House.addVariable(req.body, (err, data) => {
        if(err) {
            res.json({success:false, msg: err.message});
        } else {
            res.json({success: true, msg:"Variable registered."})
        }
    })
})

module.exports = router;