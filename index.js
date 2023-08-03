const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // create new recipe  
    let recipe = await Recipe.create({
      title: "Petit Gâteau",
      level: 'Easy Peasy',
      ingredients: ['200g SweetBitter Chocolate', '1/4 cup of sugar', '2 eggs', '2 spoons of unsalted butter', '2 spoons of flour', '2 egg yolks'],
      dishType: 'dessert',
      duration: 30,
      creator: 'Suely Terezinha',
      cuisine: "French",
    });
    

    let petitGateau = await Recipe.find({title: 'Petit Gâteau'});
    console.log(petitGateau)


    // Insert the entire array of data
    let allRecipesDb = await Recipe.insertMany(data);
  

    allRecipesDb.forEach((element) => {
      console.log(element.title)
    });
    
    // update 'Rigatoni alla Genovese'

    let updatedRecipe = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    let rigatoni = await Recipe.find({title: 'Rigatoni alla Genovese'})
    console.log(rigatoni, 'Rigatoni alla Genovese successfully updated')

    // Using the Model.deleteOne static, remove that recipe from the database and display a success message after doing it!

    let removeRecipe = await Recipe.deleteOne({title: 'Carrot Cake'})
    let carrotCake = await Recipe.find({title: 'Carrot Cake'})
    console.log(carrotCake, 'Carrot Cake successfully deleted') 

    // Close the database

    const dbDisconnection = await mongoose.connection.close(MONGODB_URI);

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
