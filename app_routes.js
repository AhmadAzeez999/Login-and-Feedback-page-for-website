const express = require('express');
const app_router = express.Router();
const a_controll = require('./app_controller');

app_router.route('/compare').get(a_controll.authenticated, a_controll.get_compare);
app_router.route('/about').get(a_controll.get_about);
app_router.route('/contact').get(a_controll.authenticated , a_controll.get_contact).post(a_controll.authenticated, a_controll.mail);
app_router.route('/finder').get(a_controll.authenticated , a_controll.get_finder);
app_router.route('/home').get(a_controll.get_dashboard);
app_router.route('/signup').get(a_controll.signup_form).post(a_controll.signup);
app_router.route('/login').get(a_controll.send_login).post(a_controll.login);
app_router.route('/').get(a_controll.get_dashboard);
app_router.route('/get-fed').post(a_controll.ad_check, a_controll.return_feed);


module.exports = app_router;