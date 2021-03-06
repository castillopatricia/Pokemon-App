import axios from "axios";
import { baseUrl } from "../config";

export function getPokemons() {
  return async function (dispatch) {
    dispatch({ type: "POKEMONS_LOADING" });
    try {
      var json = await axios.get(`${baseUrl}/pokemons`);
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      alert("no existen los pokemones");
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${baseUrl}/types`);
      return dispatch({
        type: "GET_TYPES",
        payload: json.data,
      });
    } catch (error) {
      alert("no existen los tipos");
    }
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

export function getPokemonsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${baseUrl}/pokemons?name=` + name);
      return dispatch({
        type: "GET_POKEMONS_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      alert("pokemon inexistente");
    }
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    dispatch({ type: "POKEMONS_LOADING" });
    try {
      var json = await axios.get(`${baseUrl}/pokemons/` + id);
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      alert("pokemon inexistente");
    }
  };
}
