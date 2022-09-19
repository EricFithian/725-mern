const express = require('express');
const router = express.Router();
const { Breweries } = require('../models')

///////////////////////////////
// ROUTES
////////////////////////////////

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Breweries.find({}));
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