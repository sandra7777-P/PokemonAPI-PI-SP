// index.js
const { Router } = require('express');
const router = Router();

// Importar el router de pokemons
const pokemonsRouter = require('./pokemons'); // Utiliza la ruta relativa desde index.js

// Configurar el router de pokemons
router.use('/pokemons', pokemonsRouter);

module.exports = router;
