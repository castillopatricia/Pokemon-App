const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

const getApiInfo = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

  const results = response.data.results;
  const promises = results.map((el) => axios.get(el.url));
  const responses = await Promise.all(promises);
  const pokemons = responses.map((response) => {
    return {
      nombre: response.data.name,
      imagen: response.data.sprites.other["official-artwork"].front_default,
      tipo: response.data.types.map((el) => el.type.name),
      id: response.data.id,
    };
  });
  return pokemons;
};
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Tipo,
      atributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
    attributes: ["nombre", "id"],
  });
};
const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoConcatenada = apiInfo.concat(dbInfo);
  return infoConcatenada;
};

module.exports = { getAllPokemons };
