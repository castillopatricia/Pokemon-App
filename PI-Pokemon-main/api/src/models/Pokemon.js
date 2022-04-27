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
    id: {
      type: DataTypes.UUID, // numero random con letras y n'umeros que no se va a repetir
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vida: { type: DataTypes.INTEGER },
    fuerza: { type: DataTypes.INTEGER },

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
