"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Posts";
    return queryInterface.bulkInsert(
      options,
      [
        {
          title: "The First Cup",
          coffee: "2",
          text: "Ann made me a latte, this time with honey and cinnamon. She always puts so much of herself into the coffee she makes.",
          rating: "5.00",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Second Cup",
          coffee: "1",
          text: "She always makes the best coffee, I don't think there is any other like it.",
          rating: "4.00",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Third Cup",
          coffee: "3",
          text: "I can't quite remember what it was, but it was made by Ann, I loved it because of that.",
          rating: "5.00",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Posts";
    return queryInterface.bulkDelete(options, null, {});
  },
};
