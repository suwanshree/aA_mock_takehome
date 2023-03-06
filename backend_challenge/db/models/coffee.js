"use strict";
const { Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define("Coffee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caffineContent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    caffinePercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Coffee.associate = function (models) {
    Coffee.hasMany(models.Post, {
      foreignKey: "coffee",
      onDelete: "cascade",
      hooks: true,
    });
  };

  Coffee.writeCoffee = async function ({
    ownerId,
    title,
    imageUrl,
    description,
  }) {
    const coffee = await Coffee.create({
      ownerId,
      title,
      imageUrl,
      description,
    });
    return coffee;
  };

  return Coffee;
};
