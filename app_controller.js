let mongoose = require('mongoose');
let user_model = require('./tech_user_model');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const feed_modal = require("./feedback_model");
exports.signup_form = async (req, res) => {
    try{
            res.sendFile(__dirname + '/templates/signup.html');
   
    }
    catch(err){
         res.status(404).json({
            resp: "Some error occured: " + err.message
         });
    }
}


exports.signup = async (req, res) => {
    try {
        const { username, useremail, password, confirmPassword } = req.body;

        if (password === undefined || confirmPassword === undefined || password !== confirmPassword) {
            throw new Error("The password and the confirm password do not match");
        }

        let new_password;
        try {
            new_password = await bcrypt.hash(password, 12);
        } catch (err) {
            throw new Error("Unable to hash the password");
        }

        let user_obj = await user_model.create({ username, useremail, password: new_password });
        
        res.status(201).json({
            resp: "Successfully signed up"
        });
        

    } catch (err) {
        res.status(404).json({
            resp: err.message
        });
    }
};


exports.send_login = async (req, res) => {
    try{
    res.sendFile(__dirname + '/templates/login.html');
    }
    catch(err){
        res.status(404).json({
            resp: "Some error occured: " + err.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { useremail, password } = req.body;
        if (password === 'so#cool*admin_935!' && useremail === 'techinez-admin@gmail.com') {
                    req.session.isAuth = true;
                    req.session.email = useremail;
            res.sendFile(__dirname + '/templates/control_panel.html');
        } else {
            const found_user = await user_model.findOne({ useremail });
            if (found_user) {
                const valid = await bcrypt.compare(password, found_user.password);
                if (valid) {
                    req.session.isAuth = true;
                    req.session.user = { "username": found_user.username };
                    req.session.email = { useremail };
                    res.redirect('/home');
                } else {
                    throw new Error("The password is incorrect");
                }
            } else {
                throw new Error("The user with this email is not found, sign up again");
            }
        }
    } catch (err) {
        res.status(404).json({
            resp: err.message
        });
    }
};

exports.mail = async (req,res) => {
const {message} = req.body;
const u_e = req.session.email.useremail;
const saved_feed = await feed_modal.create({from: u_e, feedback: message});
if(saved_feed){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'jay.d.mistry03@gmail.com',
          pass: 'kpwutwryfhzrfbkf'
        },
      
      });
      
      var mailOptions = {
        from: 'jay.d.mistry03@gmail.com',
        to: req.session.email.useremail,
        subject: 'Thankyou',
        text: 'Thankyou so much for your feedback, we will review and make the important changes soon'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({
              resp:"Your feedback has been collected, thank you so much!"
          })
        }
      });
      
}
else{
    res.status(404).json({
        resp: "The feedback is not saved"
    })
}
}


exports.get_dashboard = async (req, res) => {
    try{
        res.sendFile(__dirname + '/templates/index.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}

exports.get_finder = async (req, res) => {
    try{
        res.sendFile(__dirname + '/templates/finder.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}


exports.get_feedback = async (req, res) => {

    try{
        res.sendFile(__dirname + '/templates/feedback.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}

exports.get_contact = async (req, res) => {

    try{
        res.sendFile(__dirname + '/templates/contact.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}

exports.get_about = async (req, res) => {

    try{
        res.sendFile(__dirname + '/templates/aboutUs.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}
exports.get_compare = async (req, res) => {

    try{
        res.sendFile(__dirname + '/templates/compare.html');
        }
        catch(err){
            res.status(404).json({
                resp: "Some error occured: " + err.message
            })
        }
}

exports.ad_check = async (req, res, next) => {
    if(req.session.email === "techinez-admin@gmail.com"){
        next();
    }
    else{
        res.status.json({
            resp: "Unauthorized"
        })
    };
}
exports.return_feed = async (req,res) => {
    const feed = await feed_modal.find();
    if(feed){
        res.status(200).json({
            arr: feed
        })
    }
    else{
        res.status(404).json({
            resp: "No feedbacks so far"
        })
    }
}

exports.authenticated = async (req,res,next) => {
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/login');
    }
}

exports.get_cred = async (req,res) => {
      const curr_data = req.session.user.username;
      if(curr_data){
        res.status(200).json({
            resp: curr_data
        })
      }
      else{
        res.status(404).json({
            resp: "The user is not logged in to perform this action"
        })
      }
}


