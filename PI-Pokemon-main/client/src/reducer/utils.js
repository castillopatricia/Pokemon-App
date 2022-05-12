export function filterPokemons(allPokemons, filteredByCreate, filteredByTypes) {
  let pokemonsFilter;

  if (filteredByCreate === "All") {
    pokemonsFilter = allPokemons;
  } else {
    pokemonsFilter =
      filteredByCreate === "created"
        ? allPokemons.filter((p) => p.createdInDb === true) // booleano
        : allPokemons.filter((p) => !p.createdInDb);
  }

  if (filteredByTypes !== "All") {
    pokemonsFilter = pokemonsFilter.filter((p) => p.tipos.find((t) => t.nombre === filteredByTypes));
  }

  return pokemonsFilter;
}
export function pokemonsOrder(pokemonsArr, orderedPokemonsByName, orderedPokemonsByForce) {
  let pokemons = [...pokemonsArr];

  if (orderedPokemonsByName === "asc") {
    pokemons = pokemons.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      } else if (b.nombre > a.nombre) {
        return -1;
      } else return 0;
    });
  } else if (orderedPokemonsByName === "desc") {
    pokemons = pokemons.sort(function (a, b) {
      if (a.nombre < b.nombre) {
        return 1;
      } else if (b.nombre < a.nombre) {
        return -1;
      } else return 0;
    });
  }

  if (orderedPokemonsByForce === "menor") {
    pokemons = pokemons.sort(function (a, b) {
      if (a.fuerza > b.fuerza) {
        return 1;
      } else if (b.fuerza > a.fuerza) {
        return -1;
      } else return 0;
    });
  } else if (orderedPokemonsByForce === "mayor") {
    pokemons = pokemons.sort(function (a, b) {
      if (a.fuerza < b.fuerza) {
        return 1;
      } else if (b.fuerza < a.fuerza) {
        return -1;
      } else return 0;
    });
  }

  return pokemons;
}
