var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const User= require('../models/users');
const {checkBody} = require('../modules/checkBody')



router.post('/signup',(req, res)=>{
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword  = req.body.userPassword;

    const reqSchema=['userName','userEmail','userPassword'];
    if (checkBody(req.body,reqSchema)){
    //if (!userEmail || !userPassword){
        res.json({ result:   false, error: 'Missing or empty fields' });
    }else{
        User.findOne({email : { $regex: new RegExp(userEmail, 'i') }}).then(data=>{

            if (data){
                res.json({ result: false, error: 'User already exists' });
            }else {
                const newUser= new User({
                    name : userName,
                    email : userEmail,
                    password : userPassword,
                })            
                newUser.save().then(data=>{
                    res.json({ result: true });
                })
            }

        })
    }

})



router.post('/signin',(req, res)=>{
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword  = req.body.userPassword;
    
    const reqSchema=['userName','userEmail','userPassword'];
    if (checkBody(req.body,reqSchema)){
        res.json({ result: false, error: 'Missing or empty fields' });
    }else{
        User.findOne({email : { $regex: new RegExp(userEmail, 'i') } ,password :userPassword} ).then(data=>{

            if (data){
                res.json({ result: true });
            }else {
                res.json({ result: false, error: 'User not found' });
            }

        })
    }
})


module.exports=router;