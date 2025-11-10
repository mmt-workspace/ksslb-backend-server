const router = require("express").Router()
const MakePayment = require("../app/MakePayment/MakePayment")
const CheckEmail = require("../app/MakePayment/CheckEmail")
const CheckNumber = require("../app/MakePayment/CheckNumber")
const Signup = require("../app/applicants/SignUp/Signup")
const CheckEmailApplicant = require("../app/applicants/SignUp/CheckEmailApplicant")
const CheckMobileApplicant = require("../app/applicants/SignUp/CheckMobileApplicant")
const LoginApplicant = require("../app/applicants/login/LoginApplicant")
const CheckEmptyEmail = require("../app/applicants/login/CheckEmptyEmail")
const DashLogin = require("../app/dashbord/login/DashLogin")
const {GetRefreshTokens,GetRefreshTokensDash} = require("../auth/jwt")
const Transpasscode = require("../transpasscode/Transpasscode")
const {CountVisitor} = require("../route/CountVisitors")



// Make Payment token route
router.post("/make_payment",CheckEmail,CheckNumber,MakePayment)
// admin_u_login
router.post("/admin_u_login",DashLogin)

// Sign Up
router.post("/signup",CheckEmailApplicant,CheckMobileApplicant,Signup)
 
// LoginApplicant
router.post("/login_applicant",CheckEmptyEmail,LoginApplicant)
// refresh tokena
router.get("/refresh_token",GetRefreshTokens)
// refresh token
router.get("/refresh_token_dash",GetRefreshTokensDash)

// set admin transpass
router.get("/36366360/:passcodeParams",Transpasscode)
// CountVisitor
router.get("/visitor",CountVisitor)




module.exports = router