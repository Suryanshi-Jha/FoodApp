const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/FoodApp';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    console.log("Connected to Mongo");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const foodData = await foodCollection.find({}).toArray();

    const categoryCollection = mongoose.connection.db.collection("foodCategory");
    const categoryData = await categoryCollection.find({}).toArray();

    return { foodData, categoryData };
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
};

module.exports = connectToMongo;
