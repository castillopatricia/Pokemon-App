const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// funciones controladoras:
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
router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  const pokemonsTotal = await getAllPokemons();

  if (name) {
    let pokemonsName = pokemonsTotal.filter((el) => {
      return el.nombre.toLowerCase() === name.toLowerCase();
    });

    if (pokemonsName.length !== 0) {
      return res.status(200).send(pokemonsName);
    } else {
      res.status(404).send("No se encontró el pokemon ingresado");
    }
  } else {
    res.status(200).send(pokemonsTotal);
  }
});
router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    if (isNaN(idPokemon)) {
      const pokemonFound = await Pokemon.findByPk(idPokemon);
      return res.send(pokemonFound);
    } else {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const pokemondetail = {
        nombre: response.data.name,
        imagen: response.data.sprites.other["official-artwork"].front_default,
        tipo: response.data.types.map((el) => el.type.name),
        vida: response.data.stats[0].base_stat,
        peso: response.data.weight,
        altura: response.data.height,
        defensa: response.data.stats[2].base_stat,
        velocidad: response.data.stats[5].base_stat,
        fuerza: response.data.stats[1].base_stat,
        id: response.data.id,
      };
      res.send(pokemondetail);
    }
  } catch (error) {
    res.status(404).send("No se encontro el pokemon requerido");
  }
});

router.get("/types", async (req, res) => {
  const typesApi = await axios.get(" https://pokeapi.co/api/v2/type");
  const types = typesApi.data.map((el) => el.types);
  res.status(200).send(types);
});
module.exports = router;
