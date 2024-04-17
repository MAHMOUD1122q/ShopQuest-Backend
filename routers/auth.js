import express  from "express";
import {Logout, allUser, login, register,deleteUser, generateOTP, verifyOTP, ResetPassword, updatedPassword, updatedUser, SingleUser, UserCart, allCart, DeleteCart, incrementQuntityCartItem, dencrementQuntityCartItem, addToWishlist, getWishlist} from "../controllers/auth.js";
import isAuth, { localVariables } from '../middleware/auth.js';
import { sendMail } from '../controllers/mailer.js'

const router = express.Router();

//============ POST=========

router.post("/register", register) // register user

router.post('/sendMail', sendMail); // send the email

router.post("/login",login) // login user

router.post("/logout", Logout)// logout user

router.post("/add-to-cart", isAuth, UserCart);

router.post("/reset-password/:id",  ResetPassword);

//============ GET =========


router.get("/all-cart", isAuth, allCart);

router.get("/all-wishlist", isAuth, getWishlist);

router.get('/generateOTP',localVariables,generateOTP) // generate random OTP

router.get('/verifyOTP/:id',verifyOTP) // verify generated OTP

router.get('/single-user/:id', SingleUser) 

router.get("/all-users", allUser) // get all user

// router.get('/createResetSession',createResetSession) // reset all the variables

//============ DELETE =========

router.delete("/delete-item-cart/:id", isAuth, DeleteCart);

router.delete("/delete-user/:id", deleteUser) // use to delete user 

//============ PUT =========

router.put("/increment-item-cart/:id", isAuth, incrementQuntityCartItem);

router.put("/dencrement-item-cart/:id", isAuth, dencrementQuntityCartItem);

router.put("/add-wishlist",isAuth, addToWishlist);

//============ PATCH =========

router.patch('/update-password/:id',updatedPassword); // use to update password

router.patch('/update-user/:id',updatedUser); // use to update user 


export default router;