const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.redirect("/login")
    }
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.redirect("/login")
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.redirect("/login?log=false")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.redirect("/login?log=false")
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret)
        res.cookie("token", token)
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            const user = await User.create({ username, password: hashedPassword })
            res.redirect("/login?create=true")
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register,
    authMiddleware
}