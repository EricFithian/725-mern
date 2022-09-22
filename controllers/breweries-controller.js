const express = require('express');
const router = express.Router();
const { Breweries } = require('../models')

///////////////////////////////
// ROUTES
////////////////////////////////

router.get('/', async (req, res) => {
    try {
      console.log(req.query);
      if(req.query.search) {
        const breweryType = await Breweries.find({brewery_type: req.query.search});
        const nameType = await Breweries.find({name: req.query.search})
        const cityName = await Breweries.find({city: req.query.search})
        const stateName = await Breweries.find({state: req.query.search})
        const allFields = [...breweryType, ...nameType, ...cityName, ...stateName];
        res.json(allFields)
        // res.json(await Breweries.find({brewery_type: req.query.search}))
      } else {
        res.json(await Breweries.find({}))
      }
    } catch(err) {
        console.log(err);
    }
})

router.post('/', async (req, res) => {
    try {
        res.status(201).json(await Breweries.create(req.body));
    } catch (err) {
        console.log(err);
    }
})

// BREWERIES SHOW ROUTE
router.get("/:id", async (req, res) => {
    try {
        // get people by ID
        res.json(await Breweries.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
});

// BREWERIES UPDATE ROUTE
router.put("/:id", async (req, res) => {
  try {
    // update people by ID
    res.json(
      await Breweries.findByIdAndUpdate(req.params.id, req.body, {new:true})
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// BREWERIES DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    // delete breweries by ID
    res.json(await Breweries.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

module.exports = router;