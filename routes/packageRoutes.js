const express = require("express");
const Package = require("../models/Package");
const { validate } = require("../middlewares");
const { tourPackageSchema, bookingSchema } = require("../schema.js");
const router = express.Router();

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Add a new package
router.post("/", validate(tourPackageSchema), async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.json(savedPackage);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const packageData = await Package.findById(id);

  if (packageData) {
    res.status(200).json(packageData);
  } else {
    res.status(404).json({ message: "Package not found" });
  }
});
// Update a package
router.put("/:id", async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Delete a package
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
