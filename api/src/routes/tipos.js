const { Router } = require('express');
const router = Router();
const { Tipo } = require ('../db');
const axios = require('axios');

router.get('/', async (req, res) => {
    try{
    const apiT = await axios.get('https://pokeapi.co/api/v2/type');

    apiT.data.results.map((tipo) => {
        Tipo.findOrCreate({where: {name: tipo.name}})
    }) 

    res.json(await Tipo.findAll())

   } catch(error){
    res.json(error)
   }
})

module.exports = router;