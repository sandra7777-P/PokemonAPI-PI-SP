const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Configuración de Sequelize

const Pokemon = sequelize.define('Pokemon', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Vida: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Ataque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Defensa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Velocidad: {
    type: DataTypes.INTEGER,
  },
  Altura: {
    type: DataTypes.FLOAT,
  },
  Peso: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Pokemon;
