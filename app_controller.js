let mongoose = require('mongoose');
let user_model = require('./tech_user_model');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const feed_modal = require("./feedback_model");
const link_saver = require('./save-search-model');

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
            return res.status(404).json({
                resp: "Password and confirm password should match"
            });
        }

        let new_password;
        try {
            new_password = await bcrypt.hash(password, 12);
        } catch (err) {
            throw new Error("Signup failed due to technical issue with the password encryption mechanism, try agian later");
        }

        let user_obj = await user_model.create({ username, useremail, password: new_password });
        if(user_obj){
            res.status(201).json({
                resp: "Successfully signed up"
            });
        }
        else{
           throw new Error("Signup failed due to some technical issue with the database, try again later");
        }
        
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
            res.redirect('/panel');
        } else {
            const found_user = await user_model.findOne({ useremail });
            if (found_user) {
                const valid = await bcrypt.compare(password, found_user.password);
                if (valid) {
                    req.session.isAuth = true;
                    req.session.user = { "username": found_user.username };
                    req.session.email = { useremail };
                    res.status(200).json({
                       resp: "You have logged in"
                    });
                } else {
                    throw new Error("The password is incorrect");
                }
            } else {
                throw new Error("The user with this email is not found, sign up again");
            }
        }
    } catch (err) {
        res.json({
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
            res.status(200).json({
                resp:"Your feedback has been collected, thank you so much!"
            });
        } else {
          res.status(200).json({
              resp:"Your feedback has been collected, thank you so much!"
          });
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



exports.return_cred = async(req,res) => {
    const user_name = req.session.user.username;
    if(user_name){
        res.status(200).json({
            resp: user_name
        })
    }
}



exports.check_is_admin = async (req,res, next) => {
    try{
        if(req.session.email === 'techinez-admin@gmail.com'){
            next();
     
        }
        else{
           res.status(403).json({
                resp: "You are not allowed"
            });
        }
    }
    catch(err){
        res.status(404).json({
            resp: "You are not allowed"
        });
    }
}


exports.save_link = async (req,res) => {
    try{
    const {link} = req.body;
    const u_e = req.session.email.useremail;
    const save_l = await link_saver.create({ user_email: u_e ,user_link: link});
    if(save_l){
        res.status(200).json({
        resp: "saved"
            });
    }
    else{
        res.status(404).json({
            resp: 'Some error'
        });
    }
}
catch(e){
    res.status(404).json({
        resp: 'Some error'
    });
}
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
        res.redirect('/account');
    }
}

exports.send_panel = async(req,res)=> {
    try{
        res.sendFile(__dirname + '/templates/control_panel.html');
    }
    catch(err){
        res.status(404).json({
            resp: "Some error in sending the file"
        })
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

exports.send_saved_searche_html = async (req,res) => {
    try{
        res.sendFile(__dirname + "/templates/saved.html");
      
    }
    catch(e){
        res.status(404).json({
            resp: "Could not find file"
        });
    }
}
exports.send_saved_searche_html = async (req,res) => {
    try{
        res.sendFile(__dirname + "/templates/saved.html");
      
    }
    catch(e){
        res.status(404).json({
            resp: "Could not find file"
        });
    }
}
exports.send_searches = async (req,res) => {
    const u_e = req.session.email.useremail;
    
    const s_list = await link_saver.find({user_email:u_e});
    if(s_list){
        res.status(200).json({
            search_list: s_list
        });
    }
    else{
        res.status(404).json({
            resp: "List was not found"
        });
    }
  
    
}

