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
    secret: `cdb4800b5871a4959f54b8ee56f7f9079b18947845c90600edf3c4627f79d3fe20f0bef69d282cbb525dd17eb694d0482f72fb34b407e5b1ddef20e387c9fe4b`,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/electrec1?retryWrites=true&w=majority"
    })
}))
app.use(express.static("public"))

app.use('/', require('./server/routes/admin'));

app.set("view engine", "ejs")

mongoose
    .connect(
        "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/electrec1?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
