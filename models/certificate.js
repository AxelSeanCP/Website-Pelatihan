"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Certificate.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Certificate.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      userId: { type: DataTypes.STRING, allowNull: false },
      courseId: DataTypes.STRING,
      courseName: DataTypes.STRING,
      pdfUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
