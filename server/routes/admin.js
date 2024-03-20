const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = `${process.env.ACCESS_TOKEN_SECRET}`;
const quest_controller = require('../controller/quest_controller')
const authController = require('../controller/authController')
const { authMiddleware } = require("../controller/authController")



router.post("/login", authController.login)

router.post("/register", authController.register)



// GET
router.route("/").get(authMiddleware, quest_controller.getPage)
    .post(authMiddleware, quest_controller.getPage)

router.get("/error", (req, res) => {
    res.render("error")
})

router.get("/login", (req, res) => {
    res.render("login", { log: req.query.log, create: req.query.create })
})

router.get("/register", async (req, res) => {
    console.log(await User.find({}));
    res.render("register")
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})
//////////////////////

router.route("/add").get(authMiddleware, quest_controller.getAllQusest)
    .post(authMiddleware, quest_controller.createQusest)

router.route("/add-old/:id").get(authMiddleware, quest_controller.getOneQusest)
    .post(authMiddleware, quest_controller.updateQusest)

router.post("/delete/:id", authMiddleware, quest_controller.deleteQusest);

module.exports = router
