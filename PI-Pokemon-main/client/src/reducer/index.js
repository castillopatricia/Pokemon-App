// import { filterByCreate, filterByTypes, orderByName, getPokemons, getTypes } from "../actions";
import { filterPokemons, pokemonsOrder } from "./utils";

const initialState = {
  pokemons: [],
  types: [],
  allPokemons: [],
  allTypes: [],
  filteredByCreate: "All",
  filteredByType: "All",
  orderedPokemonsByName: "",
  orderedPokemonsByForce: "",
  pokemonDetail: {},
  loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loading: false,
      };
    case "POKEMONS_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPES": {
      let pokemonsFilter = filterPokemons(state.allPokemons, state.filteredByCreate, action.payload);
      let orderedPokemons = pokemonsOrder(pokemonsFilter, state.orderedPokemonsByName, state.orderedPokemonsByForce);
      return {
        ...state,
        pokemons: orderedPokemons,
        filteredByType: action.payload,
      };
    }

    case "FILTER_BY_CREATE": {
      let pokemonsFilter = filterPokemons(state.allPokemons, action.payload, state.filteredByType);
      let orderedPokemons = pokemonsOrder(pokemonsFilter, state.orderedPokemonsByName, state.orderedPokemonsByForce);

      return {
        ...state,
        pokemons: orderedPokemons,
        filteredByCreate: action.payload,
      };
    }

    case "ORDER_BY_NAME": {
      let pokemonsFilter = filterPokemons(state.allPokemons, state.filteredByCreate, state.filteredByType);
      let orderedPokemons = pokemonsOrder(pokemonsFilter, action.payload, state.orderedPokemonsByForce);
      return {
        ...state,
        pokemons: orderedPokemons,
        orderedPokemonsByName: action.payload,
      };
    }
    case "ORDER_BY_FORCE": {
      let pokemonsFilter = filterPokemons(state.allPokemons, state.filteredByCreate, state.filteredByType);
      let orderedPokemons = pokemonsOrder(pokemonsFilter, state.orderedPokemonsByName, action.payload);
      return {
        ...state,
        pokemons: orderedPokemons,
        orderedPokemonsByForce: action.payload,
      };
    }
    case "GET_POKEMONS_BY_NAME":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "GET_POKEMON_DETAIL":
      return {
        ...state,
        pokemonDetail: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
}
export default rootReducer;
