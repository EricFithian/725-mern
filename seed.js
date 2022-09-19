require("dotenv").config();
const { MONGODB_URI } = process.env;

// Add in mongoose
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI);

// Connection Events
mongoose.connection
  .on("open", () => console.log("This is my awesome amazing connection man"))
  .on("close", () => console.log("Your are disconnected from mongoose :'("))
  .on("error", (error) => console.log(error));

const { Breweries } = require('./models')

const seedingData = async () => {
    try {
        const myBreweries = await fetch('https://api.openbrewerydb.org/breweries');
        const allBreweries = await myBreweries.json();
        const deletedBreweries = await Breweries.deleteMany({})
        const addedBreweries = await Breweries.insertMany(allBreweries);
        console.log(deletedBreweries);
        console.log(addedBreweries);
    } catch(err) {
        console.log(err);
    }
}

seedingData();