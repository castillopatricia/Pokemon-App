const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { getAllPokemons } = require("../controllers/controllers");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// funciones controladoras:
router.get("/pokemons", async (req, res) => {
  const { name } = req.query;

  if (name) {
    try {
      let pokemonDb = await Pokemon.findOne({
        where: {
          nombre: name,
        },
        include: {
          model: Tipo,
          attributes: ["nombre", "id"],
          through: {
            attributes: [],
          },
        },
        attributes: ["nombre", "id", "createdInDb", "fuerza"],
      });
      if (pokemonDb) {
        res.send(pokemonDb);
      } else {
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let pokemon = {
          nombre: response.data.name,
          imagen: response.data.sprites.other["official-artwork"].front_default,
          tipos: response.data.types.map((el) => ({ nombre: el.type.name })),
          id: response.data.id,
          fuerza: response.data.stats[1].base_stat,
        };
        res.send(pokemon);
        console.log("🚀 ~ file: index.js ~ line 42 ~ router.get ~ pokemon", pokemon)
      }
    } catch (error) {
      res.status(404).send("No se encontró el pokemon ingresado");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();
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
router.post("/pokemons", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(404).send("No se puede crear el pokemon");
  }
  try {
    const pokemonCreated = await Pokemon.create(req.body);
    // addTipos crea la asociacion de tablas.
    // Se debería validar antes de crear el pokemon, si recibe tipos que estos existan en la db, y que no esten repetidos.
    await pokemonCreated.addTipos(req.body.tipos);
    res.send(pokemonCreated);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/types", async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");

  const types = typesApi.data.results.map((el) => {
    return el.name;
  });
  types.forEach((t) => {
    Tipo.findOrCreate({
      where: { nombre: t },
    });
  });
  const todosLosTipos = await Tipo.findAll();
  res.json(todosLosTipos);
});
module.exports = router;

//router.get("/types", async (req, res) => {
//findall de tipo, si devuelve array vacio, consultar a la api y crear los tipos.
//   const resultados = await Tipo.findAll();
//   if (resultados.length === 0) {
//     const typesApi = await axios.get("https://pokeapi.co/api/v2/type");

//     const types = typesApi.data.results.map((el) => {
//       return el.name;
//     });
//     for (let i = 0; i < types.length; i++) {
//       let nombre = types[i];
//       const result = await Tipo.create({ nombre: nombre });
//       resultados.push(result);
//     }
//   }
//   res.send(resultados);

///[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(id)
