const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tipo", {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
    id: {
      type: DataTypes.UUID, // numero random con letras y n'umeros que no se va a repetir
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
