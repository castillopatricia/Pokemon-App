const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Tipo", {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    id: {
      type: DataTypes.UUID, // numero random con letras y n'umeros que no se va a repetir
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });
};
