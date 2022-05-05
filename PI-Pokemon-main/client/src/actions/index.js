import axios from "axios";
// import { bindActionCreators } from "redux";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload: payload,
  };
}

export function filterByCreate(payload) {
  return {
    type: "FILTER_BY_CREATE",
    payload: payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}
export function orderByForce(payload) {
  return {
    type: "ORDER_BY_FORCE",
    payload: payload,
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pokemons", payload);
    return response.data;
  };
}
export function getPokemonsByName(name) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
    return dispatch({
      type: "GET_POKEMONS_BY_NAME",
      payload: json.data,
    });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons/" + id);
    return dispatch({
      type: "GET_POKEMON_DETAIL",
      payload: json.data,
    });
  };
}
