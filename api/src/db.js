require('dotenv').config();
const con = require('dotenv');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pokemons = require('./pokemons');



const { DB_USER, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}:@${DB_PORT}/pokemons`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);


const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Aquí vendrían las relaciones entre modelos si es necesario
// Por ejemplo, si hay relaciones entre modelos, deberían ser definidas aquí

module.exports = {
  sequelize,
  // Aquí puedes exportar los modelos directamente si es necesario
  // Por ejemplo, si necesitas importar el modelo en otro archivo
  // Ejemplo: Pokemon: sequelize.models.Pokemon
  ...sequelize.models,
};
