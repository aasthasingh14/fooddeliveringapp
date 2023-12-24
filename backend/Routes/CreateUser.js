const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisAasthaSinghStudentOfCSEDEapartmentRCOEM"

router.post(
    '/createuser',
    [
        body('email').isEmail(),
        body('password', 'Minimum length should be 5').isLength({ min: 5 }),
    ],
    async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.geolocation,
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
)


router.post('/loginuser', async (req, res) => {
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(401).json({ errors: "Invalid credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password , userdata.password)
        if (!pwdCompare) {
            return res.status(401).json({ errors: "Invalid credentials" });
        }

        const data ={
            user : {
                id : userdata.id
            }
        }
        const authtoken = jwt.sign(data,jwtSecret)
        return res.status(200).json({ success: true ,authToken : authtoken});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});


module.exports = router;
