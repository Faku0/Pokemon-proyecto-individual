import axios from 'axios';

export function getPokemons(){
     return async function(dispatch){
         const pokemons = await axios.get('http://localhost:3001/api/pokemons');
         return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
         })
     }
}

export function getPokemonsName(name){
    return async function(dispatch){
        const pokemon = await axios.get('http://localhost:3001/api/pokemons?name=' + name);
        return dispatch({
           type: 'GET_POKEMON_NAME',
           payload: pokemon.data
        })
    }
}

export function createPokemon(payload){
    return async function(dispatch){
        const pokemonCreate = await axios.post('http://localhost:3001/api/pokemons/crear', payload)
        return pokemonCreate;
    }
}
    
export function getTipos(){
    return async function(dispatch){
        const tipos = await axios.get('http://localhost:3001/api/tipos');
        return dispatch({
             type: 'GET_TYPES',
              payload: tipos.data });
    }
}

export function getDetalle(id){
    return async function(dispatch){
        const detalle = await axios.get('http://localhost:3001/api/pokemons/' + id);
        return dispatch({
            type: 'GET_DETALLE',
            payload: detalle.data
        })
    }
}

export function filtAtaque(payload){
    return{
        type: "ORDEN_ATAQUE",
        payload 
    }

}

export function filtCreados(payload){
    return{
        type: "FILT_CREADOS",
        payload 
    }

}

export function filtTipo(payload){
    return{
        type: "FILT_TIPO",
        payload 
    }

}

export function ordenName(payload){
    return{
        type: 'ORDEN_NAME',
        payload
    }
}