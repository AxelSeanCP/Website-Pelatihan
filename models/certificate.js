"use strict";
const { Model, Sequelize } = require("sequelize");
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
        as: "certificates",
      });
    }
  }
  Certificate.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: DataTypes.STRING,
      courseId: DataTypes.STRING,
      pdfUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
