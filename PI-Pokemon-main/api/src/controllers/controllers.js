const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

const getApiInfo = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");

  const results = response.data.results;
  const promises = results.map((el) => axios.get(el.url));
  const responses = await Promise.all(promises);
  const pokemons = responses.map((response) => {
    return {
      nombre: response.data.name,
      imagen: response.data.sprites.other["official-artwork"].front_default,
      tipos: response.data.types.map((el) => ({nombre: el.type.name})),
      id: response.data.id,
      fuerza: response.data.stats[1].base_stat,
    };
  });
  return pokemons;
};
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ["nombre", "id"],
      through: {
        attributes: [],
      },
    },
    // Aquí se seleccionan las propiedades a traer de las filas de pokemons
    attributes: ["nombre", "id", "createdInDb","fuerza"],
  });
};
const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoConcatenada = apiInfo.concat(dbInfo);
  return infoConcatenada;
};

module.exports = { getAllPokemons };
