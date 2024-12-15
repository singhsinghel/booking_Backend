const express = require("express");
const Booking = require("../models/Booking");
const Package = require("../models/Package");
const { validate } = require("../middlewares");
const { bookingSchema } = require("../schema");

const router = express.Router();

// Submit a booking
router.post("/", async (req, res) => {
  try { 
    console.log(req.body);
    
    const { packageId, numberOfTravelers } = req.body;
    const selectedPackage = await Package.findById(packageId);

    if (!selectedPackage) {
      return res.status(404).send("Package not found");
    }

    const totalPrice = selectedPackage.price * numberOfTravelers;
    const booking = new Booking({ ...req.body, totalPrice });
    const savedBooking = await booking.save();

    res.json({ booking: savedBooking, invoice: `Total Price: $${totalPrice}` });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// View all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("packageId");
    res.json(bookings);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
