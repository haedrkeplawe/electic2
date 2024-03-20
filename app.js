require("dotenv").config()

const mongoose = require("mongoose")
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride("_method"))
app.use(session({
    secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))
app.use(express.static("public"))

app.use('/', require('./server/routes/admin'));

app.set("view engine", "ejs")

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
