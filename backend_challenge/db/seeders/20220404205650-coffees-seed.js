"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Coffees";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "Black",
          year: "1671",
          caffineContent: "4.45",
          caffinePercentage: "40.26",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Espresso",
          year: "1906",
          caffineContent: "4.45",
          caffinePercentage: "40.26",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Latte",
          year: "1950",
          caffineContent: "4.45",
          caffinePercentage: "40.26",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Coffees";
    return queryInterface.bulkDelete(options, null, {});
  },
};
