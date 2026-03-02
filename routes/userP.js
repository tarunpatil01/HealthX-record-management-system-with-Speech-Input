const express = require("express");
// const router = express.Router({ mergeParams : true });
const routerP = express.Router();
const User_p = require("../models/userP");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrlP } = require("../middleware");

const userPController = require("../controllers/usersP");

routerP.route("/signupP")
    .get(userPController.renderSignupPForm)
    .post( wrapAsync(userPController.signupP));

routerP.route("/loginP")
    .get( userPController.renderLoginPForm)
    .post(saveRedirectUrlP, passport.authenticate("patient-local", { failureRedirect : "/loginP", failureFlash : true }), userPController.loginP);

routerP.get("/logoutP", userPController.logoutP);



module.exports = routerP;