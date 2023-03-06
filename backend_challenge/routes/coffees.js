const express = require("express");
const { Coffee } = require("../db/models");
const { asyncHandler } = require("../utils/async");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

const router = express.Router();

const coffeeValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Title"),
  check("year")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Year"),
  check("caffineContent")
    .exists({ checkFalsy: true })
    .withMessage("Please provide the Caffine Content"),
  check("caffinePercentage")
    .exists({ checkFalsy: true })
    .withMessage("Please provide the Caffine Percentage"),
  handleValidationErrors,
];

// Ping route
router.get(
  "/ping",
  asyncHandler(async (req, res) => {
    return res.json({ status: "good" });
  })
);

// Index of all coffees - default asc by name
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allCoffees = await Coffee.findAll({
      order: [["name", "ASC"]],
    });
    return res.json(allCoffees);
  })
);

// Returns single coffee with matching id
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const coffeeId = parseInt(req.params.id, 10);
    const coffee = await Coffee.findByPk(coffeeId);
    return res.json(coffee);
  })
);

// Create new Coffee route
router.post(
  "/create",
  coffeeValidators,
  asyncHandler(async (req, res) => {
    const { name, year, caffineContent, caffinePercentage } = req.body;
    const coffee = await Coffee.writeCoffee({
      name,
      year,
      caffineContent,
      caffinePercentage,
    });
    const data = coffee.dataValues;
    return res.json({
      data,
    });
  })
);

// Destroys a coffee in the database - returns if deletion was a success
router.delete(
  "/delete/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const coffeeId = parseInt(req.params.id, 10);
    const coffee = await Coffee.findByPk(coffeeId);
    await coffee.destroy();
    return res.json({ status: "Deletion Success!" });
  })
);

module.exports = router;
