const User_d = require("../models/userD")

module.exports.renderSignupDForm = (req, res) => {
    res.render("users/signupD.ejs");
};

module.exports.signupD = async(req, res) => {
    try{
        let { username, email, password} = req.body;
        const newUserD = new User_d({ email, username});
        const registeredUserD = await User_d.register(newUserD, password);
        console.log(registeredUserD);

        req.login(registeredUserD, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Doctor's account was created. Welcome to HealthX.");
            res.redirect("/doctors");
        });//Login after signup directly.
    } catch(e){
        // console.log(error);
        req.flash("error", e.message);
        res.redirect("/signupD");
    }
};

module.exports.renderLoginDForm = (req, res) => {
    res.render("users/loginD.ejs");
};

module.exports.loginD = async(req, res) => {
    req.flash("success", "Welcome to HealthX ! You are logged in as Doctor !");
    let redirectUrl = res.locals.redirectUrl || "/doctors";
    res.redirect(redirectUrl);
};

module.exports.logoutD = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }

        req.flash("success", "You are Logged Out as Doctor !");
        res.redirect("/doctors");
    })
};