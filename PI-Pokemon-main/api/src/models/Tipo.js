const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tipo", {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
