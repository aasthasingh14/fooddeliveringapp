const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        console.log(global.food_items1);
        console.log(global.food_items2);
        res.send([global.food_items1, global.food_items2]);
    } catch (error) {
        console.error(error.message);
        res.send("SERVER ERROR");
    }
});

module.exports = router;
