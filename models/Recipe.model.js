const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  level: {
    type: String,
    enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },

  ingredients: {
    type: [String],
  },

  cuisine: {
    type: String,
    required: true,
  },

  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: "https://t1.uc.ltmcdn.com/pt/posts/7/1/9/como_fazer_petit_gateau_8917_orig.jpg",
  },

  duration: {
    type: Number,
    min: 0,
  },

  creator: {
    type: String,
  },

  created: {
    type: Date,
    default: Date.now,
  }
})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
