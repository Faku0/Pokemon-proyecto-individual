const { Router } = require('express');
const router = Router();
const { Pokemon, Tipo } = require ('../db');
const { GetTodo, PorIdDb, PorIdApi, PorName } = require('../Buscadores/buscador');

router.get('/', async (req, res) => {
  try{
  const name = req.query.name;
  let pokemons = await GetTodo();

  if(name) {
    const pokemonName = await PorName(name.toLowerCase());
    return res.status(200).send([pokemonName]);
  } else {
    res.json(pokemons);
  }

  } catch(error){
    res.json(error)
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  if(id.length < 4) {
    const pokemonApi = await PorIdApi(id);
    pokemonApi ? res.json(pokemonApi) : res.status(404).send('No se encontró el pokemon'); 
  }else {
    const pokemonDb = await PorIdDb(id);
    pokemonDb ? res.json(pokemonDb) : res.status(404).send('No se encontró el pokemon'); 
  }
});


router.post('/crear', async (req, res) => {
  let { name, vida, ataque, defensa, velocidad, altura, peso, tipo, img } =
    req.body

  if (
    isNaN(vida) ||
    isNaN(ataque) ||
    isNaN(defensa) ||
    isNaN(velocidad) ||
    isNaN(altura) ||
    isNaN(peso)
  )
    return res.json({ info: "Alguno de los argumentos no es un numero" });

  if (!name) return res.json({ info: "El nombre es obligatorio" });

  const existe = await Pokemon.findOne({ where: { name: name } });
  if (existe) return res.json("El pokemon ya existe");
  if(!tipo) res.json('No hay tipo');
  if(tipo) {
  const pokemon = await Pokemon.create({
    name: name,
    vida: Number(vida),
    ataque: Number(ataque),
    img: img,
    defensa: Number(defensa),
    velocidad: Number(velocidad),
    altura: Number(altura),
    peso: Number(peso),
  });  
   
  const tipos = await Tipo.findAll({ where : { name : tipo }});
  
  await pokemon.addTipo(tipos);
}
})
module.exports = router;