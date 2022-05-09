const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
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
