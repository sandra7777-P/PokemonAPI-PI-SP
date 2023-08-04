const { Router } = require('express');
const router = Router();
const { pokemons } = require('../models/pokemons'); // Asegúrate de que la ruta sea correcta

// GET | /pokemons
router.get('/', async (req, res, next) => {
  try {
    const pokemons = await Pokemons.findAll(); // Utiliza el modelo correcto
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

// GET | /pokemons/:idPokemon
router.get('/:idPokemon', async (req, res, next) => {
  const { idPokemon } = req.params;
  try {
    const pokemon = await Pokemons.findByPk(idPokemon); // Utiliza el modelo correcto
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

// GET | /pokemons/name?="..."
router.get('/name', async (req, res, next) => {
  const { name } = req.query;
  try {
    const pokemons = await Pokemons.findAll({
      where: {
        name: name,
      },
    });
    if (pokemons.length === 0) {
      return res.status(404).json({ message: 'No Pokemon found with that name' });
    }
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

// POST | /pokemons
router.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const newPokemon = await Pokemons.create({
      name: name,
    });
    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
