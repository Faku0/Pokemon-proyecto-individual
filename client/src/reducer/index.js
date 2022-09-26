const initialState = { 
  pokemons: [],
  Pokemons: [],
  pokemon: [],
  tipo: [],
  detalle: [], 
};

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                Pokemons: action.payload
            }
        case 'GET_TYPES':
                return{
                    ...state,
                    tipo: action.payload
                }
        case 'GET_POKEMON_NAME':
             return{
                 ...state,
                pokemons: action.payload
            }
        case 'GET_DETALLE':
            return{
                ...state,
                detalle: action.payload
            }    
        case 'POST_POKEMON':
            return{
                ...state,
            }                  
        case 'ORDEN_NAME':
          console.log([...state.pokemons])
            let ordenPokemons = [...state.pokemons];
            ordenPokemons = ordenPokemons.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "asc" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "asc" ? 1 : -1;
        }
        return 0; 
      });

      return {
        ...state,
        pokemons:
          action.payload === "Filt" ? state.Pokemons : ordenPokemons
      };
        case 'FILT_CREADOS':
            const DbPokemon = state.pokemons;
            const ApiPokemon = state.pokemons;
            const filtro = action.payload === 'created' ? DbPokemon.filter(f => f.id.length > 4) : ApiPokemon.filter(f => f.id.length < 4)
            return{
                ...state,
                pokemons: action.payload === 'all' ? state.Pokemons : filtro
            }
        case 'FILT_TIPO':
            const allPokemons = state.pokemons;
            const tipoFilt = allPokemons.filter(e => e.tipos.includes(action.payload));
            return {
                 ...state,
                 pokemons: action.payload === "All" ? state.Pokemons :  tipoFilt,
            };       
        case 'ORDEN_ATAQUE':
            let ordenPokemon = [...state.pokemons];
            ordenPokemon = ordenPokemon.sort((a, b) => {
            if (a.ataque < b.ataque) {
             return action.payload === "Menor Ataque" ? -1 : 1;
            }
            if (a.ataque > b.ataque) {
            return action.payload === "Menor Ataque" ? 1 : -1;
            }
            return 0; 
            });

              return {
                ...state,
                pokemons:action.payload === "Ataque" ? state.Pokemons : ordenPokemon
              };           
            default:
                return state;
    }
}

export default rootReducer;