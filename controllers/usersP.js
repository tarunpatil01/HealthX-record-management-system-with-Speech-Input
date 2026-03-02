const User_p = require("../models/userP");

module.exports.renderSignupPForm = (req, res) => {
    res.render("users/signupP.ejs");
};

module.exports.signupP = async(req, res, next) => {
    try{
        let { username, email, password } = req.body;
        const newUserP = new User_p({email, username});
        const registeredUserP = await User_p.register(newUserP, password);
        console.log(registeredUserP);
        req.login(registeredUserP, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Patient's account was registered. Welcome to HealthX.");
            res.redirect("/patients");
        });
    } catch(error){
        console.log(error);
        req.flash("error", error.message);
        res.redirect("/signupP");
    }
};

module.exports.renderLoginPForm = (req, res) => {
    res.render("users/loginP.ejs");
};

module.exports.loginP = async(req, res) => {
    req.flash("success", "Welcome to HealthX! You are logged in as Patient!");
    let redirectUrl = res.locals.redirectUrl || "/patients";
    res.redirect(redirectUrl);
};

module.exports.logoutP = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }

        req.flash("success", "You are Logged Out as Patient !");
        res.redirect("/patients");
    })
}