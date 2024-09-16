import express from "express";

const User = express.Router()

User.get('/test', (req, res) => {
    res.send('OK User');
})

export default User;