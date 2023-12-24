const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://singhar5:xLLSO1eE3lXVnnpO@cluster0.arz9smo.mongodb.net/fooddeliveringapp?retryWrites=true&w=majority';


const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const foodItems1 = await mongoose.connection.db.collection("food_items1").find({}).toArray();
        const foodItems2 = await mongoose.connection.db.collection("food_items2").find({}).toArray();

        for (let i = 0; i < foodItems1.length; i++) {
            const category = foodItems2.find(item => item.categoryId === foodItems1[i].categoryId);
            foodItems1[i].category = category;
        }

        global.food_items1 = foodItems1;
        global.food_items2 = foodItems2;
    } catch (error) {
        console.error('Connection to MongoDB failed:', error.message);
        throw error;
    }
};

module.exports = mongoDB;
