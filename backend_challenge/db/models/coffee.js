"use strict";
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
    name,
    year,
    caffineContent,
    caffinePercentage,
  }) {
    const coffee = await Coffee.create({
      name,
      year,
      caffineContent,
      caffinePercentage,
    });
    return coffee;
  };

  return Coffee;
};
