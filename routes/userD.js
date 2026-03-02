const express = require("express");
// const router = express.Router({ mergeParams : true });
const routerD = express.Router();
const UserD = require("../models/userD");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrlD } = require("../middleware");

const UserDController = require("../controllers/usersD");

routerD.route("/signupD")
    .get( UserDController.renderSignupDForm)
    .post( wrapAsync(UserDController.signupD));

routerD.route("/loginD")
    .get( UserDController.renderLoginDForm)
    .post( saveRedirectUrlD, passport.authenticate("doctor-local", { failureRedirect : "/loginD", failureFlash : true }), UserDController.loginD);

routerD.get("/logoutD", UserDController.logoutD);

module.exports = routerD;