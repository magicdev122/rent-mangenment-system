const express = require("express");
const router = express.Router();
const passport = require ("passport");
const jwt = require ("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey('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');

const from = config.myEmail;

const msg = {
    to: 'danielgreendev@gmail.com', // Change to your recipient
    from: 'jun.lu.1222@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        emergencyContact: req.body.emergencyContact,
    });

    User.addUser(newUser, (err, data)=> {
        if(err){
            res.json({success: false, msg: err.message});
        }
        else {
            res.json({success: true, msg: "User registered."});
        }
    });
});

router.post("/authenticate", (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: "User not found."});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800,
                });
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({success: false, msg: "Wrong password."});
            }
        });
    });
});

router.get("/profile", passport.authenticate("jwt", {session: false}), (req, res, next)=>{
    res.json({
        user: req.user
    });
});

router.get('/residents', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.json({residents: users})
    })
})

router.post('/set-address', (req, res, next) => {
    User.setAddress (req.body, (err, data) => {
        if(err) {
            res.json({success:false, msg: err.message});
        } else {
            res.json({success: true, msg:"Variable registered."})
        }
    })
})

router.post('/send-mail', (req, res, next) => {
    sendgrid
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })   
})

module.exports = router;