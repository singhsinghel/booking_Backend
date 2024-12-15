const express = require("express");
const router = express.Router();
const TourPackage = require("../models/Package.js");

// Get all packages
router.get("/packages", async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new package
router.post("/packages", async (req, res) => {
  const { title, description, price, image, availableDates } = req.body;

  const newPackage = new TourPackage({
    title,
    description,
    price,
    image,
    availableDates,
  });

  try {
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing package
router.put("/packages/:id", async (req, res) => {
  const { title, description, price, image, availableDates } = req.body;

  try {
    const updatedPackage = await TourPackage.findByIdAndUpdate(
      req.params.id,
      { title, description, price, image, availableDates },
      { new: true }
    );
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package
router.delete("/packages/:id", async (req, res) => {
  try {
    await TourPackage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
