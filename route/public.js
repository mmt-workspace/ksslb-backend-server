const router = require("express").Router()
const MakePayment = require("../app/MakePayment/MakePayment")
const CheckEmail = require("../app/MakePayment/CheckEmail")
const CheckNumber = require("../app/MakePayment/CheckNumber")
const Signup = require("../app/applicants/SignUp/Signup")
const CheckEmailApplicant = require("../app/applicants/SignUp/CheckEmailApplicant")
const CheckMobileApplicant = require("../app/applicants/SignUp/CheckMobileApplicant")
const LoginApplicant = require("../app/applicants/login/LoginApplicant")
const CheckEmptyEmail = require("../app/applicants/login/CheckEmptyEmail")

// Make Payment token route
router.post("/make_payment",CheckEmail,CheckNumber,MakePayment)

// Sign Up
router.post("/signup",CheckEmailApplicant,CheckMobileApplicant,Signup)

// LoginApplicant
router.post("/login_applicant",CheckEmptyEmail,LoginApplicant)










module.exports = router