const { Router } = require("express");

const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { getAllPokemons } = require("../controllers/controllers");
const router = Router();



//ruta get pokemons:

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;

  if (name) {
    let nombreQuery = name.toLowerCase();
    try {
      let pokemonDb = await Pokemon.findOne({
        where: {
          nombre: nombreQuery,
        },
        include: {
          model: Tipo,
          attributes: ["nombre", "id"],
          through: {
            attributes: [],
          },
        },
        attributes: ["nombre", "id", "createdInDb", "fuerza", "imagen"],
      });
      if (pokemonDb) {
        res.send(pokemonDb);
      } else {
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombreQuery}`);

        let pokemon = {
          nombre: response.data.name,
          imagen: response.data.sprites.other["official-artwork"].front_default,
          tipos: response.data.types.map((el) => ({ nombre: el.type.name })),
          id: response.data.id,
          fuerza: response.data.stats[1].base_stat,
        };
        res.send(pokemon);
      }
    } catch (error) {
      res.status(404).send("No se encontró el pokemon ingresado");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();
    res.status(200).send(pokemonsTotal);
  }
});


// ruta get con id por params

router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;
    if (isNaN(idPokemon)) {
      const pokemonFound = await Pokemon.findByPk(idPokemon, {
        include: {
          model: Tipo,
          attributes: ["nombre", "id"],
          through: {
            attributes: [],
          },
        },
      });
      if (pokemonFound) {
        return res.send(pokemonFound);
      } else {
        res.status(404).send("No se encontró el pokemon ingresado");
      }
    } else {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const pokemondetail = {
        nombre: response.data.name,
        imagen: response.data.sprites.other["official-artwork"].front_default,
        tipos: response.data.types.map((el) => ({ nombre: el.type.name })),
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
    res.status(404).send("No se encontró el pokemon requerido");
  }
});


//RUTA POST:

router.post("/pokemons", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(404).send("No se puede crear el pokemon");
  } 
  if (!/^[a-z]+$/g.test(nombre)) {
    return res.status(404).send("El nombre del pokemon debe estar en minúsculas");
  }

  try {
    let pokemonFound = await Pokemon.findOne({
      where: {
        nombre: nombre,
      },
    });
    if (pokemonFound) {
      return res.status(400).send("el pokemon ya existe");
    }

    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (response.data) {
        return res.status(400).send("el pokemon ya existe");
      }
    } catch (error) {}
    let tipos = req.body.tipos;

    if (tipos) {
      for (let i = 0; i < tipos.length; i++) {
        const tipo = tipos[i];
        const result = await Tipo.findOne({
          where: {
            nombre: tipo,
          },
        });
        if (!result) {
          return res.status(400).send(`el tipo ${tipo} no existe`);
        }
      }
    }

    //crear en base de datos:

    const pokemonCreated = await Pokemon.create(req.body);

    await pokemonCreated.addTipos(req.body.tipos);
    res.send(pokemonCreated);
  } catch (error) {
    res.status(404).send(error);
  }
});


// RUTA GET TYPES:
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
