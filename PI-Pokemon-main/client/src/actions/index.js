import axios from "axios";


export function getPokemons() {
  return async function (dispatch) {
    dispatch({ type: "POKEMONS_LOADING" });
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
export function filterByWeight(payload){
  return{
    type:'FILTER_BY_WEIGHT',
    payload
  }
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
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
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
    var json = await axios.get("http://localhost:3001/pokemons/" + id);
    return dispatch({
      type: "GET_POKEMON_DETAIL",
      payload: json.data,
    });
  };

}

 //action con promesas
//export function fetchPost(valor){
  //return function (dispatch){
    // dispatch(getPost())
    //axios.get(`https://jsonplaceholder.typecode.com/todos/${valor}`)
   // .then(r=>r.data)
   //.then(d=>dispatch(receivePost(d)))
   //.catch(e=>console.log(e))
//  }
//}