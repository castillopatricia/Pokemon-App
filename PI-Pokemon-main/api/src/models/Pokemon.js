const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("pokemon", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    vida: { type: DataTypes.INTEGER },
    fuerza: { type: DataTypes.INTEGER },
    imagen: { type: DataTypes.STRING },
    defensa: { type: DataTypes.INTEGER },
    velocidad: { type: DataTypes.INTEGER },
    altura: { type: DataTypes.INTEGER },
    peso: { type: DataTypes.INTEGER },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
