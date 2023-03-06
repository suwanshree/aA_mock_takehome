"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coffee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.Coffee, { foreignKey: "coffee" });
  };

  Post.writePost = async function ({ title, coffee, text, rating }) {
    const newPost = await Post.create({
      title,
      coffee,
      text,
      rating,
    });
    return newPost;
  };

  return Post;
};
