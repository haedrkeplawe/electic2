const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = "cdb4800b5871a4959f54b8ee56f7f9079b18947845c90600edf3c4627f79d3fe20f0bef69d282cbb525dd17eb694d0482f72fb34b407e5b1ddef20e387c9fe4b";
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
