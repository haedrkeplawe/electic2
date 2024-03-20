const Quset = require("../models/customerSchema");

const getPage = (req, res) => {
    const method = req.query.method
    console.log(method);
    if (!method) {
        return res.render("index");
    }
    Quset.find()
        .then((result) => {
            res.render("type/typeof", { arr: result, type: `${method}` });
        })
}

const getAllQusest = (req, res) => {
    res.render("user/add", { type: req.query.type })
}
const getOneQusest = (req, res) => {
    Quset.findById(req.params.id)
        .then((result) => {
            res.render("user/add-old", { obj: result, type: req.query.type });
        })
}
const createQusest = (req, res) => {
    Quset.create(req.body)
        .then(() => {
            res.redirect(`/?method=${req.body.type}`);
        })
}
const updateQusest = (req, res) => {
    Quset.findByIdAndUpdate(req.params.id, { type, name, quest, ans1, ans2, ans3, ans4, ans5, number } = req.body, { new: true })
        .then((updatedUser) => {
            res.redirect(`/?method=${req.body.type}`);
        })
}
const deleteQusest = (req, res) => {
    Quset.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.redirect(`/?method=${req.body.type}`);
        })
}

module.exports = {
    getPage,
    getAllQusest,
    getOneQusest,
    createQusest,
    updateQusest,
    deleteQusest
}