export function filterPokemons(allPokemons, filteredByCreate, filteredByTypes, filteredByWeight) {
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

  if (filteredByWeight === "high") {
    pokemonsFilter = pokemonsFilter.filter((p) => p.peso >= 1000);
  }

  return pokemonsFilter;
}
export function pokemonsOrder(pokemonsArr, orderedPokemonsByName, orderedPokemonsByForce) {
  let pokemons = [...pokemonsArr];
  let pokemonsOrderByName = [];

  if (orderedPokemonsByName === "") {
    pokemonsOrderByName = pokemons;
  } else {
    pokemonsOrderByName =
      orderedPokemonsByName === "asc"
        ? pokemons.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            } else if (b.nombre > a.nombre) {
              return -1;
            } else return 0;
          })
        : pokemons.sort(function (a, b) {
            if (a.nombre < b.nombre) {
              return 1;
            } else if (b.nombre < a.nombre) {
              return -1;
            } else return 0;
          });
  }

  let pokemonsOrderByForce;

  if (orderedPokemonsByForce === "") {
    pokemonsOrderByForce = pokemonsOrderByName;
  } else {
    pokemonsOrderByForce =
      orderedPokemonsByForce === "menor"
        ? pokemonsOrderByName.sort(function (a, b) {
            if (a.fuerza > b.fuerza) {
              return 1;
            } else if (b.fuerza > a.fuerza) {
              return -1;
            } else return 0;
          })
        : pokemonsOrderByName.sort(function (a, b) {
            if (a.fuerza < b.fuerza) {
              return 1;
            } else if (b.fuerza < a.fuerza) {
              return -1;
            } else return 0;
          });
  }

  return pokemonsOrderByForce;
}
