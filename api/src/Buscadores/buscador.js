const { Pokemon, Tipo } = require("../db.js");
const axios = require('axios');

// const GetApiPokemons = async () => {
//   const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
//   const results = apiUrl.data.results

//   const pokemonInfo = []
  
//   for(let i = 0 ; i < results.length ; i++){
//     const pokes = await axios.get(results[i].url);
//     const pokeInfo = pokes.data;

//     pokemonInfo.push({
//       id: pokeInfo.id,
//       name: pokeInfo.name,
//       tipos: pokeInfo.types.map((t) => t.type.name),
//       img: pokeInfo.sprites.other['official-artwork'].front_default,
//       attack: pokeInfo.stats[1].base_stat,
//       weight: pokeInfo.weight,
//       height: pokeInfo.height
//     });
//   }
  
//   return pokemonInfo;
// }

const GetApiPokemons = async () => {
    const ApiP = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
    const Api1 = ApiP.data.results;
    
    const Todo = [];
    for(let i = 0; i < Api1.length; i++) {      
          let pokemon = await axios.get(Api1[i].url)
          let poke = pokemon.data;

          Todo.push({
            id: poke.id,
            ataque: poke.stats[1].base_stat,
            name: poke.name,
            tipos: poke.types.map((t) => t.type.name),
            img: poke.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
          });  
      }
    return Todo; 
}

// const GetDbPokemons = async () => {
//       let a = await Pokemon.findAll({
//          include: {
//           model: Tipo,
//           attributes: ['name'],
//           through: {
//             attributes: [],
//           } 
//         }
//         });
//       let b = [];
//      for(i = 0; i < a.length; i++){
//       if(!a) return 'Nada en Db';
//       else {
//         b.push({
//           id: a[i].id,
//           name: a[i].name,
//           tipos: a[i].tipos.map(o => o.name),
//           img: a[i].img,
//           ataque: a[i].ataque,
//         })
//       }
//      }
//      return b;
// }

const GetDbPokemons = async () => {
	const data = (await Pokemon.findAll({ 
    include: {
      model: Tipo,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return{
      ...json,
      tipos: json.tipos.map(tipo => tipo.name)
    }
  });
  
  return data
}


const GetTodo = async () => {
    const ApiPoke = await GetApiPokemons();
    const DbPoke = await GetDbPokemons();
    const PokeTotal = [...ApiPoke, ...DbPoke];
    return PokeTotal;
}

const PorIdApi = async (id) => {
    const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const PorApi = api.data;
    const pokemonApi = [];  

     pokemonApi.push({
        id: PorApi.id,
        name: PorApi.name,
        tipos: PorApi.types.map(o => o.type.name),
        img: PorApi.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        vida: PorApi.stats[0].base_stat,
        ataque: PorApi.stats[1].base_stat,
        defensa: PorApi.stats[2].base_stat,
        velocidad: PorApi.stats[5].base_stat,
        altura: PorApi.height,
        peso: PorApi.weight,
      });
      return pokemonApi; 
    };

const PorIdDb = async (id) => {    
    const PorDb = await Pokemon.findByPk(id, { include: Tipo });
    
    const pokemonDb = [];
    pokemonDb.push({
      id: PorDb.id,
      name: PorDb.name,
      tipos: PorDb.tipos.map(o => o.name),
      img: PorDb.img ? PorDb.img : "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
      vida: PorDb.vida,
      ataque: PorDb.ataque,
      defensa: PorDb.defensa,
      velocidad: PorDb.velocidad,
      altura: PorDb.altura,
      peso: PorDb.peso,
    });
    return pokemonDb;
}

const PorName = async (name) => {
  const apiPokeUrl = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/" + name
  );
  const results = apiPokeUrl.data;

  const pokemonInfo = {
    id: results.id,
    name: results.name,
    types: results.types.map((t) => t.type.name),
    img: results.sprites.versions["generation-v"]["black-white"].animated
    .front_default,
    weight: results.weight,
    height: results.height,
  };
  console.log(pokemonInfo);

  return pokemonInfo;
}
    

 module.exports = {
    GetTodo,
    PorIdApi,
    PorIdDb,
    PorName
};