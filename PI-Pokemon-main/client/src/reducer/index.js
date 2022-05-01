import { filterByTypes } from "../actions";

const initialState = {
  pokemons: [],
  types: [],
  allPokemons: [],
  allTypes: [],
  filteredByCreate: "All",
  filteredByType: "All",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPES": {
      let pokemonsFilterByCreate;
      if (state.filteredByCreate === "All") {
        pokemonsFilterByCreate = state.allPokemons;
      } else {
        pokemonsFilterByCreate =
          state.filteredByCreate === "created"
            ? state.allPokemons.filter((p) => p.createdInDb === true) // booleano
            : state.allPokemons.filter((p) => !p.createdInDb);
      }
      const pokemonsFilterByType = pokemonsFilterByCreate.filter((p) =>
        p.tipos.find((t) => t.nombre === action.payload)
      );

      return {
        ...state,
        pokemons: action.payload === "All" ? pokemonsFilterByCreate : pokemonsFilterByType,
        filteredByType: action.payload,
      };
    }

    case "FILTER_BY_CREATE": {
      let pokemonsFilterByType;
      if (state.filteredByType === "All") {
        pokemonsFilterByType = state.allPokemons;
      } else {
        pokemonsFilterByType = state.allPokemons.filter((p) => p.tipos.find((t) => t.nombre === state.filteredByType));
      }
      const pokemonsFilterByCreate =
        action.payload === "created"
          ? pokemonsFilterByType.filter((p) => p.createdInDb === true) // booleano
          : pokemonsFilterByType.filter((p) => !p.createdInDb);

      return {
        ...state,
        pokemons: action.payload === "All" ? pokemonsFilterByType : pokemonsFilterByCreate,
        filteredByCreate: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
export default rootReducer;
